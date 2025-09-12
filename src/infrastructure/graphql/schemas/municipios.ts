// src/infrastructure/graphql/schemas/Municipios.ts
import { buildSchema } from 'graphql';

export const municipiosSchema = buildSchema(`
  scalar DateTime
  scalar Date


  type Municipio {
    id: String!
    nombre: String!
    codigo_dane: String
    departamento_id: String!
  }

  type Query {
    getMunicipios: [Municipio]
    getMunicipio(id: String!): Municipio
  }

  type Mutation {
    createMunicipio(input: MunicipioInput): Municipio
    updateMunicipio(id: String!, input: MunicipioInput): Municipio
    deleteMunicipio(id: String!): String

  }

  input MunicipioInput {
    id: String!
    nombre: String
    codigo_dane: String!
    departamento_id: String
  }
`);
