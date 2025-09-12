import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import { beneficiariosSchema } from './beneficiarios';
import { eventosSchema } from './eventos';
import { departamentosSchema } from './departamentos';
import { DateTypeDefinition } from 'graphql-scalars';
import { beneficiariosResolvers } from '../resolvers/beneficiarios/beneficiarios.resolver';
import { eventosResolvers} from '../resolvers/eventos/eventos.resolver';
import { departamentosResolvers } from '../resolvers/departamentos/departamentos.resolver';
import { municipiosResolvers } from '../resolvers/municipios/municipios.resolver';
import { municipiosSchema } from './municipios';
import { authResolvers } from '../resolvers/auth/auth.resolver';
import { authSchema } from './auth';
const typeDefs = mergeTypeDefs([beneficiariosSchema, 
                                eventosSchema, 
                                departamentosSchema,
                                municipiosSchema, 
                                authSchema,
                                DateTypeDefinition]); 
const resolvers = mergeResolvers([beneficiariosResolvers, 
                                  eventosResolvers, 
                                  departamentosResolvers,
                                  municipiosResolvers,
                                authResolvers                                
                            ]);
                                

const schema = makeExecutableSchema({
  typeDefs,
  resolvers, 
});

export default schema;