// src/domain/models/Beneficiario.ts
export class Beneficiario {
    constructor(
      public id: Number,
      public nombres: String,
      public apellidos: String,
      public tipo_doc: String,
      public numero_documento: String ,
      public fecha_nacimiento: Date,
      public pais_nacimiento?: String,
      public depto_nacimiento?: String,  
      public municipio_nacimiento?: String,

    ) {}
  }
  