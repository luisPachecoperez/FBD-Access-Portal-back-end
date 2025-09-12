// src/domain/repositories/IBeneficiarioRepository.ts
import { Municipio } from '../models/municipios';
export interface IMunicipioRepository {
  getMunicipios(): Promise<Municipio[]>;
  getMunicipio(id: String): Promise<Municipio | null>;
  createMunicipio(municipio: Municipio): Promise<Municipio>;
  updateMunicipio(id: String, municipio: Municipio): Promise<Municipio>;
  deleteMunicipio(id: String): Promise<void>;
}
