import { beneficiariosResolvers } from './resolvers/beneficiarios/beneficiarios.resolver';
import { eventosResolvers } from './resolvers/eventos/eventos.resolver';
import {departamentosResolvers} from './resolvers/departamentos/departamentos.resolver';
import { municipiosResolvers } from './resolvers/municipios/municipios.resolver';
import { authResolvers } from './resolvers/auth/auth.resolver';

export const rootResolvers = {
  // Beneficiarios
  ...beneficiariosResolvers,
  // Eventos
  ...eventosResolvers,
  // Departamentos
  ...departamentosResolvers,
  // municipios
  ...municipiosResolvers,
  //Autenticacion
  ...authResolvers
};