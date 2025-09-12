
import { Evento } from "../../../domain/models/eventos";
import { IEventoRepository } from "../../../domain/repositories/IEventoRepository";
import { IEventoDataSource } from "../../../domain/datasource/eventos/IEventoDataSource";

export class EventoRepositoryImpl implements IEventoRepository {
      constructor(private readonly dataSource: IEventoDataSource) {
      console.log("Iniciando EventoRepositoryImpl");    
    }
  
  async getEventos(): Promise<Evento[]> {
    console.log("Pasa por repository consulta Eventos");
    return await this.dataSource.getEventos();
  }

  async getEvento(id: number): Promise<Evento | null> {
    return await this.dataSource.getEvento(id);
    
  }

  async createEvento(evento: Evento): Promise<Evento> {
    return await this.dataSource.createEvento(evento);
    
  }

  async updateEvento(
    id: number,
    evento: Evento
  ): Promise<Evento> {
    return await this.dataSource.updateEvento(id, evento);

  }

  async deleteEvento(id: number): Promise<void> {
    await this.dataSource.deleteEvento(id);
  }
}
