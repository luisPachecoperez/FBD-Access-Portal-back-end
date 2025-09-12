// src/domain/usecases/beneficiarios/BeneficiarioService.ts
import { IBeneficiarioRepository } from '../../repositories/IBeneficiarioRepository';
import { Beneficiario } from '../../models/beneficiarios';

export class GetBeneficiarioByIdService {
  constructor(private beneficiarioRepository: IBeneficiarioRepository) {
  }
  async execute(id: number): Promise<Beneficiario | null> {
    return this.beneficiarioRepository.getBeneficiario(id);
  }

}
