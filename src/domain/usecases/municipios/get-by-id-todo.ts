// src/domain/usecases/Municipios/MunicipioService.ts
import { IMunicipioRepository } from '../../repositories/IMunicipioRepository';
import { Municipio } from '../../models/municipios';

export class GetMunicipioByIdService {
  constructor(private municipioRepository: IMunicipioRepository) {
  }
  async execute(id: String): Promise<Municipio | null> {
    return this.municipioRepository.getMunicipio(id);
  }

}
