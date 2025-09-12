// src/infrastructure/repositories/implementations/SessionRepository.ts
import { pool } from "../../db/pool";

import { Session } from "../../../domain/models/sessions";

import { ISessionDataSource } from "../../../domain/datasource/sessions/ISessionDataSource";
import {
  getAllSessionsQuery,
  getSessionByIdQuery,
  createSessionQuery,
  updateSessionQuery,
  deleteSessionQuery,
} from "../../db/queries/sessions-queries-postgres";

export class SessionDataSourcePostgres implements ISessionDataSource {
  async getSessions(): Promise<Session[]> {
    console.log("Pasa por repository consulta Sessions");
    const res = await pool.query(getAllSessionsQuery);
    console.log("Llamada a repositorio consulta repositorio:");
    return res.rows.map(
      (row: Session) =>
        new Session(
          row.session_id,
          row.user_id,
          row.user_email,
          row.user_name,
          row.user_picture,
          row.ip,
          row.ua,
          row.created_at,
          row.last_access,
          row.expires_at,
          row.revoked,
          row.user_uuid
        )
    );
  }

  async getSession(session_id: String): Promise<Session | null> {
    console.log("Pasa por repository consulta Session por ID:", session_id);
    const res = await pool.query(getSessionByIdQuery, [session_id]);
    console.log("Respuesta de la consulta:", res.rows);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return new Session(
      row.session_id,
      row.user_id,
      row.user_email,
      row.user_name,
      row.user_picture,
      row.ip,
      row.ua,
      row.created_at,
      row.last_access,
      row.expires_at,
      row.revoked,
      row.user_uuid
    );
  }

  async createSession(session: Session): Promise<Session> {
    const res = await pool.query(createSessionQuery, [
      session.session_id,
      session.user_id,
      session.user_email,
      session.user_name,
      session.user_picture,
      session.ip,
      session.ua,
      session.created_at,
      session.last_access,
      session.expires_at,
      session.revoked,
      session.user_uuid,
    ]);
    const row = res.rows[0];
    return new Session(
      row.session_id,
      row.user_id,
      row.user_email,
      row.user_name,
      row.user_picture,
      row.ip,
      row.ua,
      row.created_at,
      row.last_access,
      row.expires_at,
      row.revoked,
      row.user_uuid
    );
  }

  async updateSession(session_id: String, session: Session): Promise<Session> {
    const res = await pool.query(updateSessionQuery, [
      session.user_id,
      session.user_email,
      session.user_name,
      session.user_picture,
      session.ip,
      session.ua,
      session.created_at,
      session.last_access,
      session.expires_at,
      session.revoked,
      session.user_uuid,
      session_id,
    ]);
    const row = res.rows[0];
    return new Session(
      row.session_id,
      row.user_id,
      row.user_email,
      row.user_name,
      row.user_picture,
      row.ip,
      row.ua,
      row.created_at,
      row.last_access,
      row.expires_at,
      row.revoked,
      row.user_uuid
    );
  }

  async deleteSession(session_id: String): Promise<void> {
    await pool.query(deleteSessionQuery, [session_id]);
  }
}
