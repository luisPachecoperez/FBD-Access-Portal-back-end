import { pool } from "../../db/pool";

import { Municipio } from "../../../domain/models/municipios";

import { IMunicipioDataSource } from "../../../domain/datasource/municipios/IMunicipioDataSource";

import {
  getAllMunicipiosQuery,
  getMunicipioByIdQuery,
  createMunicipioQuery,
  updateMunicipioQuery,
  deleteMunicipioQuery,
} from "../../db/queries/municipios-queries-postgres";

export class MunicipioDataSourcePostgres implements IMunicipioDataSource {
  async getMunicipios(): Promise<Municipio[]> {
    console.log("Pasa por repository consulta Municipios");

    const res = await pool.query(getAllMunicipiosQuery);
    console.log("Llamada a repositorio consulta repositorio:");
    return res.rows.map(
      (row: Municipio) =>
        new Municipio(
          row.id,
          row.nombre,
          row.codigo_dane,
          row.departamento_id
        )
    );
  }

  async getMunicipio(id: string): Promise<Municipio | null> {
    const res = await pool.query(getMunicipioByIdQuery, [id]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return new Municipio(
      row.id,
      row.nombre,
      row.codigo_dane,
      row.departamento_id
    );
  }

  async createMunicipio(municipio: Municipio): Promise<Municipio> {
    const res = await pool.query(createMunicipioQuery, [
      municipio.id,
      municipio.nombre,
      municipio.codigo_dane,
      municipio.departamento_id
    ]);
    const row = res.rows[0];
    return new Municipio(
      row.id,
      row.nombre,
      row.codigo_dane,
      row.departamento_id
    );
  }

  async updateMunicipio(id: string, municipio: Municipio): Promise<Municipio> {
    const res = await pool.query(updateMunicipioQuery, [
      municipio.nombre,
      municipio.codigo_dane,
      municipio.departamento_id,
      municipio.id

    ]);
    const row = res.rows[0];
    return new Municipio(
      row.id,
      row.nombre,
      row.codigo_dane,
      row.departamento_id
    );
  }

  async deleteMunicipio(id: string): Promise<void> {
    await pool.query(deleteMunicipioQuery, [id]);
  }
} 
