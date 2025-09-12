// src/infrastructure/graphql/schemas/Departamentos.ts
import { buildSchema } from 'graphql';

export const departamentosSchema = buildSchema(`
  scalar DateTime
  scalar Date


  type Departamento {
    id: String!
    nombre: String!
    codigo_dane: String
    pais_id: String!
  }

  type Query {
    getDepartamentos: [Departamento]
    getDepartamento(id: String!): Departamento
  }

  type Mutation {
    createDepartamento(input: DepartamentoInput): Departamento
    updateDepartamento(id: String!, input: DepartamentoInput): Departamento
    deleteDepartamento(id: String!): String
  }

  input DepartamentoInput {
    id: String!
    nombre: String
    codigo_dane: String!
    pais_id: String
  }
`);
