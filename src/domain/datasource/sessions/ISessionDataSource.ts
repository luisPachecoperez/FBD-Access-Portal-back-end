import {Session} from "../../models/sessions";
export interface ISessionDataSource {
  getSessions(): Promise<Session[]>;
  getSession(session_id: String): Promise<Session | null>;
  createSession(session: Session): Promise<Session>;
  updateSession(session_id: String, session: Session): Promise<Session>;
  deleteSession(session_id: String): Promise<void>;
}
