// src/domain/usecases/Eventos/EventoService.ts
import { IEventoRepository } from '../../repositories/IEventoRepository';
import { Evento } from '../../models/eventos';

export class DeleteEventoService {
  constructor(private eventoRepository: IEventoRepository) {
  }
  async execute(id: number): Promise<void> {
    return this.eventoRepository.deleteEvento(id);
  }
}
