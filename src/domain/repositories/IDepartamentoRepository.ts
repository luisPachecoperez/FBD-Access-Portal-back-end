// src/domain/repositories/IBeneficiarioRepository.ts
import { Departamento } from '../models/departamentos';
export interface IDepartamentoRepository {
  getDepartamentos(): Promise<Departamento[]>;
  getDepartamento(id: String): Promise<Departamento | null>;
  createDepartamento(departamento: Departamento): Promise<Departamento>;
  updateDepartamento(id: String, departamento: Departamento): Promise<Departamento>;
  deleteDepartamento(id: String): Promise<void>;
}
