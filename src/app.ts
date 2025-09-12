import express, { Request, Response } from "express";
import { graphqlHTTP, Options } from "express-graphql";
import { GraphQLSchema } from "graphql";
import schema from "./infrastructure/graphql/schemas";
import { rootResolvers } from "./infrastructure/graphql/rootResolvers";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as https from "https";
import * as fs from "fs";
import { pool } from "./infrastructure/db/pool";

import { GetSessionByIdService } from "./domain/usecases/sessions/get-by-id-todo";
import { Session } from "./domain/models/sessions";
import { SessionRepositoryImpl } from "./infrastructure/repositories/implementations/session.repository";
import { SessionDataSourceFactory } from "./infrastructure/datasource/DataSourceFactory";

const sessionDataSource = SessionDataSourceFactory();

const repo = new SessionRepositoryImpl(sessionDataSource); // opcion 1

const getSessionByIdService = new GetSessionByIdService(repo);

const app = express();
const isProd = process.env.NODE_ENV === "production";
var session: Session | null = null; // Variable para almacenar la sesión

function getBearerFromRequest(req: any): string | null {
  // 1) Header estándar
  const auth = (req.headers?.authorization ?? req.headers?.Authorization) as
    | string
    | undefined;
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }

  // 2) Algunos proxies envían esto
  const fwd = req.headers?.["x-forwarded-authorization"] as string | undefined;
  if (fwd && fwd.toLowerCase().startsWith("bearer ")) {
    return fwd.slice(7).trim();
  }

  return null;
}

// Si usas ESPv2, puedes obtener los claims directamente:
function getUserInfoFromESP(req: any): Record<string, any> | null {
  const b64 = req.headers?.["x-endpoint-api-userinfo"] as string | undefined; // base64url JSON
  if (!b64) return null;
  try {
    const json = Buffer.from(b64, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/** Busca user_uuid en la sesión válida (no revocada y no expirada) */
async function fetchUserUuidFromSession(token: string): Promise<string | null> {
  console.log("Token recibido:", token);
  session = await getSessionByIdService.execute(token);
  return session ? session.user_uuid : null;
}

// CORS con credenciales
const corsOptions = {
  origin: "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

//graphiql: !process.env.NODE_ENV || process.env.NODE_ENV === "development",

// GraphQL endpoint with proper typing and error handling
app.use("/graphql", async (req: express.Request, res: express.Response) => {
  // First get the token and user_uuid
  const token = getBearerFromRequest(req);
  const user_uuid = token ? await fetchUserUuidFromSession(token) : null;
  
  // Create handler with the resolved user_uuid
  const handler = graphqlHTTP({
    schema,
    rootValue: rootResolvers,
    graphiql: true,
    context: { req, res, user_uuid }
  });
  
  return handler(req, res);
});

// HTTPS
const httpsOptions = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem"),
};

const PORT = 4000;
if (isProd) {
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(
      `🚀 Servidor HTTPS corre  en https://localhost:${PORT}/graphql`
    );
  });
} else {
  app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/graphql`);
  });
}
