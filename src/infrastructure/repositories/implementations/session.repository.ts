
import { Session } from "../../../domain/models/sessions";
import { ISessionRepository } from "../../../domain/repositories/ISessionRepository";
import { ISessionDataSource } from "../../../domain/datasource/sessions/ISessionDataSource";

export class SessionRepositoryImpl implements ISessionRepository {
      constructor(private readonly dataSource: ISessionDataSource) {
      console.log("Iniciando SessionRepositoryImpl");    
    }
  
  async getSessions(): Promise<Session[]> {
    console.log("Pasa por repository consulta Sessions");
    return await this.dataSource.getSessions();
  }

  async getSession(session_id: String): Promise<Session | null> {
    console.log("Pasa por repository consulta Sessions by id");

    return await this.dataSource.getSession(session_id);
    
  }

  async createSession(Session: Session): Promise<Session> {
    return await this.dataSource.createSession(Session);
    
  }

  async updateSession(
    session_id: String,
    Session: Session
  ): Promise<Session> {
    return await this.dataSource.updateSession(session_id, Session);

  }

  async deleteSession(session_id: String): Promise<void> {
    await this.dataSource.deleteSession(session_id);
  }
}
