// src/domain/usecases/Eventos/EventoService.ts
import { IEventoRepository } from '../../repositories/IEventoRepository';
import { Evento } from '../../models/eventos';

export class UpdateEventoService {
  constructor(private eventoRepository: IEventoRepository) {

  }

  

  async execute(id: number, evento: Evento): Promise<Evento> {
    return this.eventoRepository.updateEvento(id, evento);
  }


}
