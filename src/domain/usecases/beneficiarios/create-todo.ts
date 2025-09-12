// src/domain/usecases/beneficiarios/BeneficiarioService.ts
import { IBeneficiarioRepository } from '../../repositories/IBeneficiarioRepository';
import { Beneficiario } from '../../models/beneficiarios';

export class CreateBeneficiarioService {
  constructor(private beneficiarioRepository: IBeneficiarioRepository) {
  }
  async execute(beneficiario: Beneficiario): Promise<Beneficiario> {
    //Un ejemplo de validación
    if (beneficiario.apellidos.toUpperCase() === 'GOMEZ') {
      throw new Error('No se permite registrar beneficiarios con apellido GOMEZ');
    }
    return this.beneficiarioRepository.createBeneficiario(beneficiario);
  }


}
