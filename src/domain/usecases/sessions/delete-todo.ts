// src/domain/usecases/Sessions/Sessionservice.ts
import { ISessionRepository } from '../../repositories/ISessionRepository';
import { Session } from '../../models/sessions';

export class DeleteSessionService {
  constructor(private sessionRepository: ISessionRepository) {
  }
  async execute(id: number): Promise<void> {
    return this.sessionRepository.deleteSession(id);
  }
}
