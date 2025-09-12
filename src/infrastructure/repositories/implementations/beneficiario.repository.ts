
import { Beneficiario } from "../../../domain/models/beneficiarios";
import { IBeneficiarioRepository } from "../../../domain/repositories/IBeneficiarioRepository";
import { IBeneficiarioDataSource } from "../../../domain/datasource/beneficiarios/IBeneficiarioDataSource";

export class BeneficiarioRepositoryImpl implements IBeneficiarioRepository {
      constructor(private readonly dataSource: IBeneficiarioDataSource) {
      console.log("Iniciando BeneficiarioRepositoryImpl");    
    }
  
  async getBeneficiarios(): Promise<Beneficiario[]> {
    console.log("Pasa por repository consulta beneficiarios");
    return await this.dataSource.getBeneficiarios();
  }

  async getBeneficiario(id: number): Promise<Beneficiario | null> {
    return await this.dataSource.getBeneficiario(id);
    
  }

  async createBeneficiario(beneficiario: Beneficiario): Promise<Beneficiario> {
    return await this.dataSource.createBeneficiario(beneficiario);
    
  }

  async updateBeneficiario(
    id: number,
    beneficiario: Beneficiario
  ): Promise<Beneficiario> {
    return await this.dataSource.updateBeneficiario(id, beneficiario);

  }

  async deleteBeneficiario(id: number): Promise<void> {
    await this.dataSource.deleteBeneficiario(id);
  }
}
