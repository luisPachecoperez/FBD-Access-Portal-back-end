// src/infrastructure/graphql/schemas/Eventos.ts
import { buildSchema } from "graphql";

/*     id:Int!
     id_eje_tematico:Int!
     id_tipo_evento:Int!
     id_ubicacion:Int!
     id_responsable:Int!
     id_nombre_evento:Int!
     aliado: String!
     descripcion_grupo: String!
     no_atencion: String!
     motivo_no_atencion: String!
     desde_no_atencion: String!
     hasta_no_atencion: String!
     es_institucional: Boolean!
     usuario_creacion:Int!
     fecha_creacion: String!
     usuario_modificacion:Int!
     fecha_modificacion: String
    */

export const eventosSchema = buildSchema(`
  type Evento {
     id:Int!
     id_eje_tematico:Int!
     id_tipo_evento:Int!
     id_ubicacion:Int!
     id_responsable:Int!
     id_nombre_evento:Int!
     aliado: String!
     descripcion_grupo: String!
     no_atencion: String!
     motivo_no_atencion: String!
     desde_no_atencion: String!
     hasta_no_atencion: String!
     es_institucional: Boolean!
     usuario_creacion:Int!
     fecha_creacion: String!
     usuario_modificacion:Int!
     fecha_modificacion: String!
    
  }

  type Query {
    getEventos: [Evento]
    getEvento(id: Int!): Evento
  }

  type Mutation {
    createEvento(input: EventoInput): Evento
    updateEvento(id: Int!, input: EventoInput): Evento
    deleteEvento(id: Int!): String
  }

  input EventoInput {
    id:Int!
     id_eje_tematico:Int!
     id_tipo_evento:Int!
     id_ubicacion:Int!
     id_responsable:Int!
     id_nombre_evento:Int!
     aliado: String!
     descripcion_grupo: String!
     no_atencion: String!
     motivo_no_atencion: String!
     desde_no_atencion: String!
     hasta_no_atencion: String!
     es_institucional: Boolean!
     usuario_creacion:Int!
     fecha_creacion: String!
     usuario_modificacion:Int!
     fecha_modificacion: String!
  }
`);
