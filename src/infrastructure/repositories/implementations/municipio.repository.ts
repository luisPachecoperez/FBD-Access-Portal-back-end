// src/infrastructure/repositories/implementations/MunicipioRepository.ts
import { pool } from "../../db/pool";

import { Municipio } from "../../../domain/models/municipios";
import { IMunicipioRepository } from "../../../domain/repositories/IMunicipioRepository";
import { IMunicipioDataSource } from "../../../domain/datasource/municipios/IMunicipioDataSource";

 
export class MunicipioRepositoryImpl implements IMunicipioRepository {
      constructor(private readonly dataSource: IMunicipioDataSource) {
      console.log("Iniciando MunicipioRepositoryImpl");    
    }
  async getMunicipios(): Promise<Municipio[]> {
      console.log("Pasa por repository consulta Municipios");
      return await this.dataSource.getMunicipios();
    }
  
    async getMunicipio(id: string): Promise<Municipio | null> {
      return await this.dataSource.getMunicipio(id);
      
    }
  
    async createMunicipio(municipio: Municipio): Promise<Municipio> {
      return await this.dataSource.createMunicipio(municipio);
      
    }
  
    async updateMunicipio(
      id: string,
      municipio: Municipio
    ): Promise<Municipio> {
      return await this.dataSource.updateMunicipio(id, municipio);
  
    }
  
    async deleteMunicipio(id: string): Promise<void> {
      await this.dataSource.deleteMunicipio(id);
    }
  }