// src/domain/usecases/Municipios/MunicipioService.ts
import { IMunicipioRepository } from '../../repositories/IMunicipioRepository';
import { Municipio } from '../../models/municipios';

export class DeleteMunicipioService {
  constructor(private municipioRepository: IMunicipioRepository) {
  }
  async execute(id: String): Promise<void> {
    return this.municipioRepository.deleteMunicipio(id);
  }
}
