// src/domain/usecases/Sessionss/SessionsService.ts
import { ISessionRepository } from '../../repositories/ISessionRepository';
import { Session } from '../../models/sessions';

export class CreateSessionService {
  constructor(private sessionsRepository: ISessionRepository) {
  }
  async execute(session: Session): Promise<Session> {
   
    return this.sessionsRepository.createSession(session);
  }


}
