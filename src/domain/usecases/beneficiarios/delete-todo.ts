// src/domain/usecases/beneficiarios/BeneficiarioService.ts
import { IBeneficiarioRepository } from '../../repositories/IBeneficiarioRepository';
import { Beneficiario } from '../../models/beneficiarios';

export class DeleteBeneficiarioService {
  constructor(private beneficiarioRepository: IBeneficiarioRepository) {
  }
  async execute(id: number): Promise<void> {
    return this.beneficiarioRepository.deleteBeneficiario(id);
  }
}
