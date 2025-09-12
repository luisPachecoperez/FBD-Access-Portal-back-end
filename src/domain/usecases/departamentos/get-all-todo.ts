// src/domain/usecases/Departamentos/DepartamentoService.ts
import { IDepartamentoRepository } from '../../repositories/IDepartamentoRepository';
import { Departamento } from '../../models/departamentos';

export class GetAllDepartamentosService {
  constructor(private departamentoRepository: IDepartamentoRepository) {
  }

  async execute(): Promise<Departamento[]> {
    console.log("Pasa por Service caso de uso consulta Departamentos");
    console.log("Llamada a repositorio", Departamento);
    return this.departamentoRepository.getDepartamentos();
  }

}
