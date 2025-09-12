// src/domain/usecases/beneficiarios/BeneficiarioService.ts
import { IBeneficiarioRepository } from '../../repositories/IBeneficiarioRepository';
import { Beneficiario } from '../../models/beneficiarios';

export class GetAllBeneficiariosService {
  constructor(private beneficiarioRepository: IBeneficiarioRepository) {
  }

  async execute(): Promise<Beneficiario[]> {
    console.log("Pasa por Service caso de uso consulta beneficiarios");
    var beneficiario=this.beneficiarioRepository.getBeneficiarios();


    console.log("Llamada a repositorio", beneficiario);
    return beneficiario;
    //return this.beneficiarioRepository.getBeneficiarios();
  }

}
