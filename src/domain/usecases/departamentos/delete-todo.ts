// src/domain/usecases/Departamentos/DepartamentoService.ts
import { IDepartamentoRepository } from '../../repositories/IDepartamentoRepository';
import { Departamento } from '../../models/departamentos';

export class DeleteDepartamentoService {
  constructor(private DepartamentoRepository: IDepartamentoRepository) {
  }
  async execute(id: String): Promise<void> {
    return this.DepartamentoRepository.deleteDepartamento(id);
  }
}
