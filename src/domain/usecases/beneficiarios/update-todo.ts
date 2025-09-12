// src/domain/usecases/beneficiarios/BeneficiarioService.ts
import { IBeneficiarioRepository } from '../../repositories/IBeneficiarioRepository';
import { Beneficiario } from '../../models/beneficiarios';

export class UpdateBeneficiarioService {
  constructor(private beneficiarioRepository: IBeneficiarioRepository) {

    
  }

  

  async execute(id: number, beneficiario: Beneficiario): Promise<Beneficiario> {
    return this.beneficiarioRepository.updateBeneficiario(id, beneficiario);
  }


}
