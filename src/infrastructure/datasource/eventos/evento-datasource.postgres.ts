import { pool } from "../../db/pool";

import { Evento } from "../../../domain/models/eventos";

import { IEventoDataSource } from "../../../domain/datasource/eventos/IEventoDataSource";

import {
  getAllEventosQuery,
  getEventoByIdQuery,
  createEventoQuery,
  updateEventoQuery,
  deleteEventoQuery,
} from "../../db/queries/eventos-queries-postgres";

export class EventoDataSourcePostgres implements IEventoDataSource {
  async getEventos(): Promise<Evento[]> {
    console.log("Pasa por repository consulta Eventos");

    const res = await pool.query(getAllEventosQuery);
    console.log("Llamada a repositorio consulta repositorio:");
    return res.rows.map(
      (row: Evento) =>
        new Evento(
          row.id,
          row.id_eje_tematico,
          row.id_tipo_evento,
          row.id_ubicacion,
          row.id_responsable,
          row.id_nombre_evento,
          row.aliado,
          row.descripcion_grupo,
          row.no_atencion,
          row.motivo_no_atencion,
          row.desde_no_atencion,
          row.hasta_no_atencion,
          row.es_institucional,
          row.usuario_creacion,
          row.fecha_creacion,
          row.usuario_modificacion,
          row.fecha_modificacion
        )
    );
  }

  async getEvento(id: number): Promise<Evento | null> {
    const res = await pool.query(getEventoByIdQuery, [id]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return new Evento(
      row.id,
      row.id_eje_tematico,
      row.id_tipo_evento,
      row.id_ubicacion,
      row.id_responsable,
      row.id_nombre_evento,
      row.aliado,
      row.descripcion_grupo,
      row.no_atencion,
      row.motivo_no_atencion,
      row.desde_no_atencion,
      row.hasta_no_atencion,
      row.es_institucional,
      row.usuario_creacion,
      row.fecha_creacion,
      row.usuario_modificacion,
      row.fecha_modificacion
    );
  }

  async createEvento(evento: Evento): Promise<Evento> {
    const res = await pool.query(createEventoQuery, [
      evento.id,
      evento.id_eje_tematico,
      evento.id_tipo_evento,
      evento.id_ubicacion,
      evento.id_responsable,
      evento.id_nombre_evento,
      evento.aliado,
      evento.descripcion_grupo,
      evento.no_atencion,
      evento.motivo_no_atencion,
      evento.desde_no_atencion,
      evento.hasta_no_atencion,
      evento.es_institucional,
      evento.usuario_creacion,
      evento.fecha_creacion,
      evento.usuario_modificacion,
      evento.fecha_modificacion
    ]);
    const row = res.rows[0];
    return new Evento(
      row.id,
      row.id_eje_tematico,
      row.id_tipo_evento,
      row.id_ubicacion,
      row.id_responsable,
      row.id_nombre_evento,
      row.aliado,
      row.descripcion_grupo,
      row.no_atencion,
      row.motivo_no_atencion,
      row.desde_no_atencion,
      row.hasta_no_atencion,
      row.es_institucional,
      row.usuario_creacion,
      row.fecha_creacion,
      row.usuario_modificacion,
      row.fecha_modificacion
    );
  }

  async updateEvento(id: number, evento: Evento): Promise<Evento> {
    const res = await pool.query(updateEventoQuery, [
      evento.id_eje_tematico,
      evento.id_tipo_evento,
      evento.id_ubicacion,
      evento.id_responsable,
      evento.id_nombre_evento,
      evento.aliado,
      evento.descripcion_grupo,
      evento.no_atencion,
      evento.motivo_no_atencion,
      evento.desde_no_atencion,
      evento.hasta_no_atencion,
      evento.es_institucional,
      evento.usuario_creacion,
      evento.fecha_creacion,
      evento.usuario_modificacion,
      evento.fecha_modificacion,
      evento.id
    ]);
    const row = res.rows[0];
    return new Evento(
      row.id,
      row.id_eje_tematico,
      row.id_tipo_evento,
      row.id_ubicacion,
      row.id_responsable,
      row.id_nombre_evento,
      row.aliado,
      row.descripcion_grupo,
      row.no_atencion,
      row.motivo_no_atencion,
      row.desde_no_atencion,
      row.hasta_no_atencion,
      row.es_institucional,
      row.usuario_creacion,
      row.fecha_creacion,
      row.usuario_modificacion,
      row.fecha_modificacion
    );
  }

  async deleteEvento(id: number): Promise<void> {
    await pool.query(deleteEventoQuery, [id]);
  }
}
