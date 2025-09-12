// src/domain/usecases/Departamentos/DepartamentoService.ts
import { IDepartamentoRepository } from '../../repositories/IDepartamentoRepository';
import { Departamento } from '../../models/departamentos';

export class UpdateDepartamentoService {
  constructor(private departamentoRepository: IDepartamentoRepository) {

  }

  async execute(id: String, departamento: Departamento): Promise<Departamento> {
    return this.departamentoRepository.updateDepartamento(id, departamento);
  }


}
