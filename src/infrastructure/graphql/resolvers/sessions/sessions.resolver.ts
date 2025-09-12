// src/infrastructure/graphql/resolvers/SessionsResolver.ts
import { DateResolver, DateTypeDefinition } from 'graphql-scalars';
import { DateTimeResolver } from 'graphql-scalars';

import { CreateSessionService } from "../../../../domain/usecases/sessions/create-todo";
import { UpdateSessionService } from "../../../../domain/usecases/sessions/update-todo";
import { DeleteSessionService } from "../../../../domain/usecases/sessions/delete-todo";
import { GetAllSessionsService } from "../../../../domain/usecases/sessions/get-all-todo";
import { GetSessionByIdService } from "../../../../domain/usecases/sessions/get-by-id-todo";
import { Session } from "../../../../domain/models/sessions";


import { SessionRepositoryImpl } from "../../../../infrastructure/repositories/implementations/session.repository";
import { SessionDataSourceFactory } from '../../../datasource/DataSourceFactory';

const sessionDataSource = SessionDataSourceFactory();


const repo = new SessionRepositoryImpl(sessionDataSource);// opcion 1

const createSessionService = new CreateSessionService(repo);
const updateSessionService = new UpdateSessionService(repo);
const getAllSessionsService = new GetAllSessionsService(repo);
const getSessionByIdService = new GetSessionByIdService(repo);
const deleteSessionService = new DeleteSessionService(repo);

export const SessionsResolvers = {
  Date: DateResolver, 
  DateTime: DateTimeResolver,

  Query: {
    getSessions: async () => {
      return await getAllSessionsService.execute(); 

    },
    getSession: async (_parent: any, args: { id: number }) => {
      return await getSessionByIdService.execute(args.id);
    },
  },
  Mutation: {
    createSession: async (_parent: any, args: { input: any }) => {
      const { input } = args;
      const session = new Session(
        input.user_id,
        input.user_email,
        input.user_name,
        input.user_picture,
        input.ip,
        input.ua,
        input.created_at,
        input.last_access,
        input.expires_at,
        input.revoked,
        input.user_uuid
      );
      return await createSessionService.execute(session);
    },
    updateSession: async (_parent: any, args: { id: number; input: any }) => {
      const { id, input } = args;
      const session = new Session(
        input.user_id,
        input.user_email,
        input.user_name,
        input.user_picture,
        input.ip,
        input.ua,
        input.created_at,
        input.last_access,
        input.expires_at,
        input.revoked,
        input.user_uuid,
        input.session_id
      );
      return await updateSessionService.execute(id, session);
    },
    deleteSession: async (_parent: any, args: { session_id: number }) => {
      await deleteSessionService.execute(args.session_id);
      return `Session con ID ${args.session_id} eliminado`;
    },
  },
};
