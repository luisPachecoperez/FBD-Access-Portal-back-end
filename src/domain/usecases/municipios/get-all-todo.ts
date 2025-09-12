// src/domain/usecases/Municipios/MunicipioService.ts
import { IMunicipioRepository } from '../../repositories/IMunicipioRepository';
import { Municipio } from '../../models/municipios';

export class GetAllMunicipiosService {
  constructor(private municipioRepository: IMunicipioRepository) {
  }

  async execute(): Promise<Municipio[]> {
    console.log("Pasa por Service caso de uso consulta Municipios");
    console.log("Llamada a repositorio", Municipio);
    return this.municipioRepository.getMunicipios();
  }

}
