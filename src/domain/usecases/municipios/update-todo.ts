// src/domain/usecases/Municipios/MunicipioService.ts
import { IMunicipioRepository } from '../../repositories/IMunicipioRepository';
import { Municipio } from '../../models/municipios';

export class UpdateMunicipioService {
  constructor(private municipioRepository: IMunicipioRepository) {

  }
  async execute(id: String, municipio: Municipio): Promise<Municipio> {
    return this.municipioRepository.updateMunicipio(id, municipio);
  }
}
