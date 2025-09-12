// src/domain/usecases/Eventos/EventoService.ts
import { IEventoRepository } from '../../repositories/IEventoRepository';
import { Evento } from '../../models/eventos';

export class GetAllEventosService {
  constructor(private eventoRepository: IEventoRepository) {
  }

  async execute(): Promise<Evento[]> {
    console.log("Pasa por Service caso de uso consulta Eventos");
    var evento=this.eventoRepository.getEventos();
    console.log("Llamada a repositorio", Evento);
    return evento;
    
  }

}
