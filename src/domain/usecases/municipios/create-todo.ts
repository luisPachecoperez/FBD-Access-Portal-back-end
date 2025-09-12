// src/domain/usecases/Municipios/MunicipioService.ts
import { IMunicipioRepository } from '../../repositories/IMunicipioRepository';
import { Municipio } from '../../models/municipios'; 

export class CreateMunicipioService {
  constructor(private municipioRepository: IMunicipioRepository) {
  }
  async execute(municipio: Municipio): Promise<Municipio> {
    
    return this.municipioRepository.createMunicipio(municipio);
  }

} 
