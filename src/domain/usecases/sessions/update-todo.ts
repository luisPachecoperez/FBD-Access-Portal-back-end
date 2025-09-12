// src/domain/usecases/Sessions/SessionService.ts
import { ISessionRepository } from '../../repositories/ISessionRepository';
import { Session } from '../../models/sessions';

export class UpdateSessionService {
  constructor(private SessionRepository: ISessionRepository) {
  }

  async execute(id: number, session: Session): Promise<Session> {
    return this.SessionRepository.updateSession(id, session);
  }


}
