// src/domain/usecases/Eventos/EventoService.ts
import { IEventoRepository } from '../../repositories/IEventoRepository';
import { Evento } from '../../models/eventos';

export class GetEventoByIdService {
  constructor(private EventoRepository: IEventoRepository) {
  }
  async execute(id: number): Promise<Evento | null> {
    return this.EventoRepository.getEvento(id);
  }

}
