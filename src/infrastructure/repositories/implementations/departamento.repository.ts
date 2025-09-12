
import { Departamento } from "../../../domain/models/departamentos";
import { IDepartamentoRepository } from "../../../domain/repositories/IDepartamentoRepository";
import { IDepartamentoDataSource } from "../../../domain/datasource/departamentos/IDepartamentoDataSource";


export class DepartamentoRepositoryImpl implements IDepartamentoRepository {
      constructor(private readonly dataSource: IDepartamentoDataSource) {
      console.log("Iniciando DepartamentoRepositoryImpl");    
    }
  
  async getDepartamentos(): Promise<Departamento[]> {
    console.log("Pasa por repository consulta Departamentos");
    return await this.dataSource.getDepartamentos();
  }

  async getDepartamento(id: string): Promise<Departamento | null> {
    return await this.dataSource.getDepartamento(id);
    
  }

  async createDepartamento(departamento: Departamento): Promise<Departamento> {
    return await this.dataSource.createDepartamento(departamento);
    
  }

  async updateDepartamento(
    id: string,
    departamento: Departamento
  ): Promise<Departamento> {
    return await this.dataSource.updateDepartamento(id, departamento);

  }

  async deleteDepartamento(id: string): Promise<void> {
    await this.dataSource.deleteDepartamento(id);
  }
}
