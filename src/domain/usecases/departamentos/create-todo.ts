// src/domain/usecases/Departamentos/DepartamentoService.ts
import { IDepartamentoRepository } from '../../repositories/IDepartamentoRepository';
import { Departamento } from '../../models/departamentos';

export class CreateDepartamentoService {
  constructor(private departamentoRepository: IDepartamentoRepository) {
  }
  async execute(departamento: Departamento): Promise<Departamento> {
    
    return this.departamentoRepository.createDepartamento(departamento);
  }

}
