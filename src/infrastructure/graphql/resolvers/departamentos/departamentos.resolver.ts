// src/infrastructure/graphql/resolvers/DepartamentosResolver.ts
import { DateResolver, DateTypeDefinition } from 'graphql-scalars';
import { DateTimeResolver } from 'graphql-scalars';

import { CreateDepartamentoService } from "../../../../domain/usecases/departamentos/create-todo";
import { UpdateDepartamentoService } from "../../../../domain/usecases/departamentos/update-todo";
import { DeleteDepartamentoService } from "../../../../domain/usecases/departamentos/delete-todo";
import { GetAllDepartamentosService } from "../../../../domain/usecases/departamentos/get-all-todo";
import { GetDepartamentoByIdService } from "../../../../domain/usecases/departamentos/get-by-id-todo";
import { DepartamentoDataSourceFactory } from '../../../datasource/DataSourceFactory';

import { Departamento } from "../../../../domain/models/departamentos";
 
// Instancias de los casos de uso, todos usan el mismo repositorio
const repo = DepartamentoDataSourceFactory();
 

const createDepartamentoService = new CreateDepartamentoService(repo);
const updateDepartamentoService = new UpdateDepartamentoService(repo);
const getAllDepartamentosService = new GetAllDepartamentosService(repo);
const getDepartamentoByIdService = new GetDepartamentoByIdService(repo);
const deleteDepartamentoService = new DeleteDepartamentoService(repo);

export const departamentosResolvers = {
  Date: DateResolver, 
  DateTime: DateTimeResolver,

  Query: {
    getDepartamentos: async () => {
      return await getAllDepartamentosService.execute(); 

    }, 
    getDepartamento: async (_parent: any, args: { id: string }) => {
      return await getDepartamentoByIdService.execute(args.id);
    },
  },
  Mutation: {
    createDepartamento: async (_parent: any, args: { input: any }) => {
      const { input } = args;
      const departamento = new Departamento(
        input.id,
        input.nombre,
        input.codigo_dane,
        input.pais_id,
      );
      return await createDepartamentoService.execute(departamento);
    },
    updateDepartamento: async (_parent: any, args: { id: String; input: any }) => {
      const { id, input } = args;
      const departamento = new Departamento(
        input.id,
        input.nombre,
        input.codigo_dane,
        input.pais_id
      );
      return await updateDepartamentoService.execute(id, departamento);
    },
    deleteDepartamento: async (_parent: any, args: { id: String }) => {
      await deleteDepartamentoService.execute(args.id);
      return `Departamento con ID ${args.id} eliminado`;
    },
  },
};
