// src/domain/usecases/Sessions/SessionService.ts
import { ISessionRepository } from '../../repositories/ISessionRepository';
import { Session } from '../../models/sessions';

export class GetAllSessionsService {
  constructor(private SessionRepository: ISessionRepository) {
  }

  async execute(): Promise<Session[]> {
    console.log("Pasa por Service caso de uso consulta Sessions");
    var Session=this.SessionRepository.getSessions();


    console.log("Llamada a repositorio", Session);
    return Session;
    //return this.SessionRepository.getSessions();
  }

}
