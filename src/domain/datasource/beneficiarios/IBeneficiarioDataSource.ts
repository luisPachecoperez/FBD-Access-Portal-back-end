import { Beneficiario } from "../../models/beneficiarios";
export interface IBeneficiarioDataSource {
  getBeneficiarios(): Promise<Beneficiario[]>;
  getBeneficiario(id: number): Promise<Beneficiario | null>;
  createBeneficiario(beneficiario: Beneficiario): Promise<Beneficiario>;
  updateBeneficiario(id: number, beneficiario: Beneficiario): Promise<Beneficiario>;
  deleteBeneficiario(id: number): Promise<void>;
}
