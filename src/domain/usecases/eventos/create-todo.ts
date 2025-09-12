// src/domain/usecases/beneficiarios/BeneficiarioService.ts
import { IEventoRepository } from '../../repositories/IEventoRepository';

import { Evento } from '../../models/eventos';

export class CreateEventoService {
  constructor(private eventoRepository: IEventoRepository) {
  }
  async execute(evento: Evento): Promise<Evento> {
    //Un ejemplo de validación
    return this.eventoRepository.createEvento(evento);
  }


}
