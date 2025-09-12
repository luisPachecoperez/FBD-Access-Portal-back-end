// src/infrastructure/datasource/DataSourceFactory.ts
import { IBeneficiarioDataSource } from "../../domain/datasource/beneficiarios/IBeneficiarioDataSource";
import { IEventoDataSource } from "../../domain/datasource/eventos/IEventoDataSource";
import { IDepartamentoDataSource } from "../../domain/datasource/departamentos/IDepartamentoDataSource";
import { IMunicipioDataSource } from "../../domain/datasource/municipios/IMunicipioDataSource";
import { ISessionDataSource } from "../../domain/datasource/sessions/ISessionDataSource";



import { BeneficiarioDataSourcePostgres } from "./beneficiarios/beneficiario-datasource.postgres";
import { EventoDataSourcePostgres } from "./eventos/evento-datasource.postgres";
import { DepartamentoDataSourcePostgres } from "./departamentos/departamentos-datasource.postgres";
import { MunicipioDataSourcePostgres } from "./municipios/municipios-datasource.postgres";
import { SessionDataSourcePostgres } from "./sessions/sessions-datasource.postgres";

export function BeneficiarioDataSourceFactory(): IBeneficiarioDataSource {
  const dbType = process.env.DB_TYPE; // postgres, oracle, etc

  if (dbType === "pg") {
    return new BeneficiarioDataSourcePostgres();
  }
  // Por defecto Postgres
  return new BeneficiarioDataSourcePostgres();
}

export function EventoDataSourceFactory(): IEventoDataSource {
  const dbType = process.env.DB_TYPE; // postgres, oracle, etc

  if (dbType === "pg") {
    return new EventoDataSourcePostgres();
  }
  // Por defecto Postgres
  return new EventoDataSourcePostgres();
}

export function DepartamentoDataSourceFactory(): IDepartamentoDataSource {
  const dbType = process.env.DB_TYPE; // postgres, oracle, etc

  if (dbType === "pg") {
    return new DepartamentoDataSourcePostgres();
  }
  // Por defecto Postgres
  return new DepartamentoDataSourcePostgres();
}
 

export function MunicipioDataSourceFactory(): IMunicipioDataSource {
  const dbType = process.env.DB_TYPE; // postgres, oracle, etc

  if (dbType === "pg") {
    return new MunicipioDataSourcePostgres();
  }
  // Por defecto Postgres
  return new MunicipioDataSourcePostgres();
}
 

export function SessionDataSourceFactory(): ISessionDataSource {
  const dbType = process.env.DB_TYPE; // postgres, oracle, etc

  if (dbType === "pg") {
    return new SessionDataSourcePostgres();
  }
  // Por defecto Postgres
  return new SessionDataSourcePostgres();
}