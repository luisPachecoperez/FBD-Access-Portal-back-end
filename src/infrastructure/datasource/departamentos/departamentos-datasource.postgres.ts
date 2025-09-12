import { pool } from "../../db/pool";

import { Departamento } from "../../../domain/models/departamentos";

import { IDepartamentoDataSource } from "../../../domain/datasource/departamentos/IDepartamentoDataSource";

import {
  getAllDepartamentosQuery,
  getDepartamentoByIdQuery,
  createDepartamentoQuery,
  updateDepartamentoQuery,
  deleteDepartamentoQuery,
} from "../../db/queries/departamentos-queries-postgres";

export class DepartamentoDataSourcePostgres implements IDepartamentoDataSource {
  async getDepartamentos(): Promise<Departamento[]> {
    console.log("Pasa por repository consulta Departamentos");

    const res = await pool.query(getAllDepartamentosQuery);
    console.log("Llamada a repositorio consulta repositorio:");
    return res.rows.map(
      (row: Departamento) =>
        new Departamento(
          row.id,
          row.nombre,
          row.codigo_dane,
          row.pais_id
        )
    );
  }

  async getDepartamento(id: string): Promise<Departamento | null> {
    const res = await pool.query(getDepartamentoByIdQuery, [id]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return new Departamento(
      row.id,
      row.nombre,
      row.codigo_dane,
      row.pais_id
    );
  }

  async createDepartamento(departamento: Departamento): Promise<Departamento> {
    const res = await pool.query(createDepartamentoQuery, [
      departamento.id,
      departamento.nombre,
      departamento.codigo_dane,
      departamento.pais_id
    ]);
    const row = res.rows[0];
    return new Departamento(
      row.id,
      row.nombre,
      row.codigo_dane,
      row.pais_id
    );
  }

  async updateDepartamento(id: string, departamento: Departamento): Promise<Departamento> {
    const res = await pool.query(updateDepartamentoQuery, [
      departamento.nombre,
      departamento.codigo_dane,
      departamento.pais_id,
      departamento.id

    ]);
    const row = res.rows[0];
    return new Departamento(
      row.id,
      row.nombre,
      row.codigo_dane,
      row.pais_id
    );
  }

  async deleteDepartamento(id: string): Promise<void> {
    await pool.query(deleteDepartamentoQuery, [id]);
  }
} 
