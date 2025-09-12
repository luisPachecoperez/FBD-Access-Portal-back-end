import { Departamento } from "../../models/departamentos";
export interface IDepartamentoDataSource {
  getDepartamentos(): Promise<Departamento[]>;
  getDepartamento(id: string): Promise<Departamento | null>;
  createDepartamento(Departamento: Departamento): Promise<Departamento>;
  updateDepartamento(id: string, Departamento: Departamento): Promise<Departamento>;
  deleteDepartamento(id: string): Promise<void>;
}
