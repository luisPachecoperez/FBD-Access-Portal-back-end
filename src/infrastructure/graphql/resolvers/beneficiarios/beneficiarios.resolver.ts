// src/infrastructure/graphql/resolvers/beneficiariosResolver.ts
import { DateResolver, DateTypeDefinition } from 'graphql-scalars';
import { DateTimeResolver } from 'graphql-scalars';

import { CreateBeneficiarioService } from "../../../../domain/usecases/beneficiarios/create-todo";
import { UpdateBeneficiarioService } from "../../../../domain/usecases/beneficiarios/update-todo";
import { DeleteBeneficiarioService } from "../../../../domain/usecases/beneficiarios/delete-todo";
import { GetAllBeneficiariosService } from "../../../../domain/usecases/beneficiarios/get-all-todo";
import { GetBeneficiarioByIdService } from "../../../../domain/usecases/beneficiarios/get-by-id-todo";
import { Beneficiario } from "../../../../domain/models/beneficiarios";



import { BeneficiarioRepositoryImpl } from "../../../../infrastructure/repositories/implementations/beneficiario.repository";

import { BeneficiarioDataSourceFactory } from '../../../datasource/DataSourceFactory';

const beneficiarioDataSource = BeneficiarioDataSourceFactory();


const repo = new BeneficiarioRepositoryImpl(beneficiarioDataSource);// opcion 1

const createBeneficiarioService = new CreateBeneficiarioService(repo);
const updateBeneficiarioService = new UpdateBeneficiarioService(repo);
const getAllBeneficiariosService = new GetAllBeneficiariosService(repo);
const getBeneficiarioByIdService = new GetBeneficiarioByIdService(repo);
const deleteBeneficiarioService = new DeleteBeneficiarioService(repo);

export const beneficiariosResolvers = {
  Date: DateResolver, 
  DateTime: DateTimeResolver,

  Query: {
    getBeneficiarios: async () => {
      return await getAllBeneficiariosService.execute(); 

    },
    getBeneficiario: async (_parent: any, args: { id: number }) => {
      return await getBeneficiarioByIdService.execute(args.id);
    },
  },
  Mutation: {
    createBeneficiario: async (_parent: any, args: { input: any }) => {
      const { input } = args;
      const beneficiario = new Beneficiario(
        input.id,
        input.nombres,
        input.apellidos,
        input.tipo_doc,
        input.numero_documento,
        input.fecha_nacimiento,
        input.pais_nacimiento,
        input.depto_nacimiento,
        input.municipio_nacimiento
      );
      return await createBeneficiarioService.execute(beneficiario);
    },
    updateBeneficiario: async (_parent: any, args: { id: number; input: any }) => {
      const { id, input } = args;
      const beneficiario = new Beneficiario(
        input.id,
        input.nombres,
        input.apellidos,
        input.tipo_doc,
        input.numero_documento,
        input.fecha_nacimiento,
        input.pais_nacimiento,
        input.depto_nacimiento,
        input.municipio_nacimiento
      );
      return await updateBeneficiarioService.execute(id, beneficiario);
    },
    deleteBeneficiario: async (_parent: any, args: { id: number }) => {
      await deleteBeneficiarioService.execute(args.id);
      return `Beneficiario con ID ${args.id} eliminado`;
    },
  },
};
