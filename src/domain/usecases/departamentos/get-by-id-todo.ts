// src/domain/usecases/Departamentos/DepartamentoService.ts
import { IDepartamentoRepository } from '../../repositories/IDepartamentoRepository';
import { Departamento } from '../../models/departamentos';

export class GetDepartamentoByIdService {
  constructor(private departamentoRepository: IDepartamentoRepository) {
  }
  async execute(id: string): Promise<Departamento | null> {
    return this.departamentoRepository.getDepartamento(id);
  }

}
