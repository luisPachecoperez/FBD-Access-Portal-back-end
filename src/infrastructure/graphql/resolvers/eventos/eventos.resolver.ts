// src/infrastructure/graphql/resolvers/EventosResolver.ts
import { DateResolver, DateTypeDefinition } from 'graphql-scalars';
import { DateTimeResolver } from 'graphql-scalars';

import { CreateEventoService } from "../../../../domain/usecases/eventos/create-todo";
import { UpdateEventoService } from "../../../../domain/usecases/eventos/update-todo";
import { DeleteEventoService } from "../../../../domain/usecases/eventos/delete-todo";
import { GetAllEventosService } from "../../../../domain/usecases/eventos/get-all-todo";
import { GetEventoByIdService } from "../../../../domain/usecases/eventos/get-by-id-todo";


import { Evento } from "../../../../domain/models/eventos";
import { EventoRepositoryImpl } from "../../../../infrastructure/repositories/implementations/evento.repository";

import { EventoDataSourceFactory } from '../../../datasource/DataSourceFactory';

const eventoDataSource = EventoDataSourceFactory();


const repo = new EventoRepositoryImpl(eventoDataSource);

const createEventoService = new CreateEventoService(repo);
const updateEventoService = new UpdateEventoService(repo);
const getAllEventosService = new GetAllEventosService(repo);
const getEventoByIdService = new GetEventoByIdService(repo);
const deleteEventoService = new DeleteEventoService(repo);

export const eventosResolvers = {
  Date: DateResolver, 
  DateTime: DateTimeResolver,

  Query: {
    getEventos: async () => {
      return await getAllEventosService.execute(); 

    },
    getEvento: async (_parent: any, args: { id: number }) => {
      return await getEventoByIdService.execute(args.id);
    },
  },
  Mutation: {
    createEvento: async (_parent: any, args: { input: any }) => {
      const { input } = args;
      const evento = new Evento(
        input.id,
        input.id_eje_tematico,
        input.id_tipo_evento,
        input.id_ubicacion,
        input.id_responsable,
        input.id_nombre_evento,
        input.aliado,
        input.descripcion_grupo,
        input.no_atencion,
        input.motivo_no_atencion,
        input.desde_no_atencion,
        input.hasta_no_atencion,
        input.es_institucional,
        input.usuario_creacion,
        input.fecha_creacion,
        input.usuario_modificacion,
        input.fecha_modificacion
      );
      return await createEventoService.execute(evento);
    },
    updateEvento: async (_parent: any, args: { id: number; input: any }) => {
      const { id, input } = args;
      const evento = new Evento(
        input.id,
        input.id_eje_tematico,
        input.id_tipo_evento,
        input.id_ubicacion,
        input.id_responsable,
        input.id_nombre_evento,
        input.aliado,
        input.descripcion_grupo,
        input.no_atencion,
        input.motivo_no_atencion,
        input.desde_no_atencion,
        input.hasta_no_atencion,
        input.es_institucional,
        input.usuario_creacion,
        input.fecha_creacion,
        input.usuario_modificacion,
        input.fecha_modificacion
      );
      return await updateEventoService.execute(id, evento);
    },
    deleteEvento: async (_parent: any, args: { id: number }) => {
      await deleteEventoService.execute(args.id);
      return `Evento con ID ${args.id} eliminado`;
    },
  },
};
