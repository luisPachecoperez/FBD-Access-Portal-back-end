// src/domain/usecases/Sessions/SessionService.ts
import { ISessionRepository } from '../../repositories/ISessionRepository';
import { Session } from '../../models/sessions';

export class GetSessionByIdService {
  constructor(private SessionRepository: ISessionRepository) {
  }
  async execute(session_id: string): Promise<Session | null> {
    return this.SessionRepository.getSession(session_id);
  }

}
