// src/infrastructure/graphql/schemas/beneficiarios.ts
import { buildSchema } from 'graphql';

export const beneficiariosSchema = buildSchema(`
  scalar DateTime
  scalar Date


  type Beneficiario {
    id: Int!
    nombres: String!
    apellidos: String
    tipo_doc: String!
    numero_documento: String
    fecha_nacimiento: DateTime
    pais_nacimiento: String
    depto_nacimiento: String  
    municipio_nacimiento: String
  }

  type Query {
    getBeneficiarios: [Beneficiario]
    getBeneficiario(id: Int!): Beneficiario
  }

  type Mutation {
    createBeneficiario(input: BeneficiarioInput): Beneficiario
    updateBeneficiario(id: Int!, input: BeneficiarioInput): Beneficiario
    deleteBeneficiario(id: Int!): String
  }

  input BeneficiarioInput {
    primer_nombre: String!
    segundo_nombre: String
    primer_apellido: String!
    segundo_apellido: String
    fecha_nacimiento: String
    pais_nacimiento: String
    depto_nacimiento: String
    municipio_nacimiento: String
    genero: String
    tipo_documento: String
    numero_documento: String!
    direccion: String
    telefono: String
    correo: String
    estado: Boolean
  }
`);
