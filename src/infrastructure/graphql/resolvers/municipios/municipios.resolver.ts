// src/infrastructure/graphql/resolvers/MunicipiosResolver.ts
import { DateResolver, DateTypeDefinition } from 'graphql-scalars';
import { DateTimeResolver } from 'graphql-scalars';

import { CreateMunicipioService } from "../../../../domain/usecases/municipios/create-todo";
import { UpdateMunicipioService } from "../../../../domain/usecases/municipios/update-todo";
import { DeleteMunicipioService } from "../../../../domain/usecases/municipios/delete-todo";
import { GetAllMunicipiosService } from "../../../../domain/usecases/municipios/get-all-todo";
import { GetMunicipioByIdService } from "../../../../domain/usecases/municipios/get-by-id-todo";
import { MunicipioDataSourceFactory } from '../../../datasource/DataSourceFactory';

import { Municipio } from "../../../../domain/models/municipios";
 
// Instancias de los casos de uso, todos usan el mismo repositorio
const repo = MunicipioDataSourceFactory();
 

const createMunicipioService = new CreateMunicipioService(repo);
const updateMunicipioService = new UpdateMunicipioService(repo);
const getAllMunicipiosService = new GetAllMunicipiosService(repo);
const getMunicipioByIdService = new GetMunicipioByIdService(repo);
const deleteMunicipioService = new DeleteMunicipioService(repo);

export const municipiosResolvers = {
  Date: DateResolver, 
  DateTime: DateTimeResolver,
 


  Query: {
    getMunicipios: async (
      _parent: unknown,
      args: {  },
      context: { req : any, res: any, user_uuid: string }
    ) => {
      console.log("Usuario recibido en getMunicipios:", context.user_uuid);
      return await getAllMunicipiosService.execute(); 

    }, 
    getMunicipio: async (_parent: any, args: { id: string }) => {
      return await getMunicipioByIdService.execute(args.id);
    },
  },
  Mutation: {
    createMunicipio: async (_parent: any, args: { input: any }) => {
      const { input } = args;
      const municipio = new Municipio(
        input.id,
        input.nombre,
        input.codigo_dane,
        input.pais_id,
      );
      return await createMunicipioService.execute(municipio);
    },
    updateMunicipio: async (_parent: any, args: { id: String; input: any }) => {
      const { id, input } = args;
      const municipio = new Municipio(
        input.id,
        input.nombre,
        input.codigo_dane,
        input.pais_id
      );
      return await updateMunicipioService.execute(id, municipio);
    },
    deleteMunicipio: async (_parent: any, args: { id: String }) => {
      await deleteMunicipioService.execute(args.id);
      return `Municipio con ID ${args.id} eliminado`;
    },
  },
};
