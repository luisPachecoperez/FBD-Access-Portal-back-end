// src/domain/repositories/IBeneficiarioRepository.ts
import { Evento } from '../models/Eventos';
export interface IEventoRepository {
  getEventos(): Promise<Evento[]>;
  getEvento(id: number): Promise<Evento | null>;
  createEvento(evento: Evento): Promise<Evento>;
  updateEvento(id: number, evento: Evento): Promise<Evento>;
  deleteEvento(id: number): Promise<void>;
}
