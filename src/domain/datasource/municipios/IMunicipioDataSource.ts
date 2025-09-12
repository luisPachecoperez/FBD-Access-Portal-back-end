import { Municipio } from "../../models/municipios";
export interface IMunicipioDataSource {
  getMunicipios(): Promise<Municipio[]>;
  getMunicipio(id: string): Promise<Municipio | null>;
  createMunicipio(municipio: Municipio): Promise<Municipio>;
  updateMunicipio(id: string, municipio: Municipio): Promise<Municipio>;
  deleteMunicipio(id: string): Promise<void>;
}
 