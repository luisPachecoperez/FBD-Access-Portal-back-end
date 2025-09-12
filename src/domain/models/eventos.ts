// src/domain/models/Beneficiario.ts
export class Evento {
  constructor(
    public id: Number,
    public id_eje_tematico: Number,
    public id_tipo_evento: Number,
    public id_ubicacion: Number,
    public id_responsable: Number,
    public id_nombre_evento: Number,
    public aliado: String,
    public descripcion_grupo: String,
    public no_atencion: String,
    public motivo_no_atencion: String,
    public desde_no_atencion: Date,
    public hasta_no_atencion: Date,
    public es_institucional: Boolean,
    public usuario_creacion: Number,
    public fecha_creacion: Date,
    public usuario_modificacion: Number,
    public fecha_modificacion: Date
  ) {}
}

