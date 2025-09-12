// src/infrastructure/repositories/implementations/BeneficiarioRepository.ts
import { pool } from "../../db/pool";

import { Beneficiario } from "../../../domain/models/beneficiarios";

import {IBeneficiarioDataSource} from '../../../domain/datasource/beneficiarios/IBeneficiarioDataSource';
import { 
    getAllBeneficiariosQuery, 
    getBeneficiarioByIdQuery, 
    createBeneficiarioQuery, 
    updateBeneficiarioQuery,  
    deleteBeneficiarioQuery 
  } from '../../db/queries/beneficiarios-queries-postgres';

  export class BeneficiarioDataSourcePostgres  implements IBeneficiarioDataSource {
    async getBeneficiarios(): Promise<Beneficiario[]> {
      console.log("Pasa por repository consulta beneficiarios");

      const res = await pool.query(getAllBeneficiariosQuery);
      console.log("Llamada a repositorio consulta repositorio:");
      return res.rows.map( (row:Beneficiario) => new Beneficiario(
        row.id,
        row.nombres,
        row.apellidos,
        row.tipo_doc,
        row.numero_documento,
        row.fecha_nacimiento, 
        row.pais_nacimiento,
        row.depto_nacimiento,
        row.municipio_nacimiento
      ));
    }
  
    async getBeneficiario(id: number): Promise<Beneficiario | null> {
      const res = await pool.query(getBeneficiarioByIdQuery, [id]);
      if (res.rows.length === 0) return null;
      const row = res.rows[0];
      return new Beneficiario(
        row.id,
        row.nombres,
        row.apellidos,
        row.tipo_doc,
        row.numero_documento,
        row.fecha_nacimiento,
        row.pais_nacimiento,
        row.depto_nacimiento,
        row.municipio_nacimiento
      );
    }
  
    async createBeneficiario(beneficiario: Beneficiario): Promise<Beneficiario> {
      const res = await pool.query(createBeneficiarioQuery, [
        beneficiario.nombres,
        beneficiario.apellidos,
        beneficiario.tipo_doc,
        beneficiario.numero_documento,
        beneficiario.fecha_nacimiento
        
      ]);
      const row = res.rows[0];
      return new Beneficiario(
        row.id,
        row.nombres,
        row.apellidos,
        row.tipo_doc,
        row.numero_documento,
        row.fecha_nacimiento

      );
    }
  
    async updateBeneficiario(id: number, beneficiario: Beneficiario): Promise<Beneficiario> {
      const res = await pool.query(updateBeneficiarioQuery, [
        beneficiario.nombres,
        beneficiario.apellidos,
        beneficiario.tipo_doc,
        beneficiario.numero_documento,
        beneficiario.fecha_nacimiento,
        beneficiario.id
      ]);
      const row = res.rows[0];
      return new Beneficiario(
        row.id,
        row.nombres,
        row.apellidos,
        row.tipo_doc,
        row.numero_documento,
        row.fecha_nacimiento
      );
    }
  
    async deleteBeneficiario(id: number): Promise<void> {
      await pool.query(deleteBeneficiarioQuery, [id]);
    }
  }