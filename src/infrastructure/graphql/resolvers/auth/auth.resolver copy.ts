// src/infrastructure/graphql/resolvers/auth.resolver.ts
import * as jwt from "jsonwebtoken";
import { pool } from "../../../db/pool";
import { GoogleAuthService } from "../../../services/google-auth.service";
import { GoogleAuth } from "google-auth-library";
import * as dotenv from 'dotenv'; // ✅ Esto es lo correcto
import { Session } from "../../../domain/models/sessions";

dotenv.config();
const isProd = process.env.NODE_ENV === "production";
const COOKIE_NAME = isProd ? "__Host-session" : "session_auth";
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min
const SESSION_DB_TTL_HOURS = 40; // Duración de la sesión en BD
/*
async function generarToken() {
  const path = require("path");
  const fs = require("fs");

  const credsPath = path.resolve(__dirname, "../../../../../config/adc.json");
  const keys = JSON.parse(fs.readFileSync(credsPath));
  console.log("Keys from file:", keys.type);

  keys.private_key.replace(/  /g, "").replace(/\n\s+/g, "\n");

  const credenciales = {
    type: keys.type,
    project_id: keys.project_id,
    private_key_id: keys.private_key_id,
    private_key: keys.private_key,
    client_email: keys.client_email,
    client_id: keys.client_id,
    auth_uri: keys.auth_uri,
    token_uri: keys.token_uri,
    auth_provider_x509_cert_url: keys.auth_provider_cert_url,
    client_x509_cert_url: keys.client_cert_url,
    universe_domain: keys.universe_domain
  };
   
  //console.log("Credenciales de Google:", credenciales);

  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    credentials: credenciales,
  });

  const client = await auth.getClient();
  const url = `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/jwt-tokens-signer@espv2-468215.iam.gserviceaccount.com:generateIdToken`;
  try {
    const { data } = await client.request({
      url,
      method: "POST",
      data: {
        audience:
          "805564313548-77meehpvt1697vs6reevf29ihk635ei0.apps.googleusercontent.com", // Debe coincidir con ESPv2_JWT_AUDIENCE
        includeEmail: true,
      },
    });
    //console.log("Token generado:", data.token);
    return data.token;
  } catch (error) {
    console.error(
      "Error al generar token:",
      error.response?.data || error.message
    );
    throw error;
  }
}
*/
// 🔹 Método para generar token propio firmado con Google Private Key (40h)
async function generateGoogleCustomToken40h(
  userId: string,
  userEmail: string
): Promise<string> {

  const path = require("path");
  const fs = require("fs");

  const credsPath = path.resolve(__dirname, "../../../../../config/adc.json");
  const keys = JSON.parse(fs.readFileSync(credsPath));
  console.log("Keys from file:", keys.type);
  const privateKey = keys.private_key.replace(/  /g, "").replace(/\n\s+/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const exp = now + SESSION_DB_TTL_HOURS * 60 * 60;

  const payload = {
    iss: keys.client_email,
    sub: keys.client_email,
    aud: process.env.GOOGLE_CLIENT_ID,
    iat: now,
    exp: exp,
    email: userEmail,
    uid: userId,
  };

  console.log("Payload para token:", payload);
  console.log("KID:", process.env.GOOGLE_KID);

  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    header: {
      alg: "RS256", // <-- ¡Este campo es obligatorio!
      kid: process.env.GOOGLE_KID, 
      typ: "JWT",
    },
  });
}

// 🔹 Guardar la sesión en la base de datos
async function saveSessionInDB(
  sessionId: string,
  user: any,
  ip: string,
  ua: string
) {
  const expiresAt = new Date(
    Date.now() + SESSION_DB_TTL_HOURS * 60 * 60 * 1000
  );

  console.log("Guardando sesión en DB: ", user.email);
  // 1) Buscar el id de personas por email

  const querie =
    "SELECT id_persona FROM personas WHERE lower(email) = lower('" +
    user.email +
    "') LIMIT 1";

  const qPersona = await pool.query<{ id: string }>(querie);
  const user_uuid = qPersona.rows[0]?.id_persona ?? null;

  console.log("ID de persona encontrado:", user_uuid);

  // 2) Insertar/actualizar la sesión con user_uuid
  await pool.query(
    `
      INSERT INTO sessions (
        id, user_id, user_email, user_name, user_picture, ip, ua, expires_at, user_uuid
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO UPDATE
        SET last_access = now(),
            revoked = false,
            expires_at = EXCLUDED.expires_at,
            user_uuid = COALESCE(EXCLUDED.user_uuid, sessions.user_uuid)
      `,
    [
      sessionId,
      user.id,
      user.email,
      user.name || null,
      user.picture || null,
      ip,
      ua,
      expiresAt,
      user_uuid,  
    ]
  );
  //console.log("Sesión guardada/actualizada con ID:", sessionId);
}
export const authResolvers = {
  Mutation: {
    googleLogin: async (
      _parent: unknown,
      args: { token: string },
      context: { req: any; res: any }
    ) => {
      const googleAuthService = new GoogleAuthService();
      const result = await googleAuthService.verifyToken(args.token);
      if (!result.success || !result.user) {
        return {
          success: false,
          message: result.error || "Authentication failed",
          user: null,
        };
      }

   // console.log("Token de 40 hrs:\n",generateGoogleCustomToken40h(result.user.id, result.user.email));
    
     //const sessionJwt = await generarToken();
     const sessionJwt = await generateGoogleCustomToken40h(result.user.id, result.user.email);
       const ip =
        context.req.headers["x-forwarded-for"] ||
        context.req.socket.remoteAddress ||
        "";
      const ua = context.req.headers["user-agent"] || "";
      await saveSessionInDB(sessionJwt, result.user, ip.toString(), ua);

      // Enviar cookie segura al cliente
      context.res.cookie(COOKIE_NAME, sessionJwt, {
        httpOnly: isProd,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/",
        maxAge: SESSION_TTL_MS,
      });

      return {
        success: true,
        message: "Authentication successful",
        user: result.user,
      };
    },
  },
};
