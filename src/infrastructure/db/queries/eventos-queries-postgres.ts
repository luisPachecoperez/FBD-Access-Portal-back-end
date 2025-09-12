export const getAllEventosQuery = `
  SELECT * FROM public.eventos;
`;

export const getEventoByIdQuery = `
  SELECT * FROM public.eventos WHERE id = $1;
`;



export const createEventoQuery = `
  INSERT INTO eventos (
  id_eje_tematico,
  id_tipo_evento,
  id_ubicacion,
  id_responsable,
  id_nombre_evento,
  aliado,
  descripcion_grupo,
  no_atencion,
  motivo_no_atencion,
  desde_no_atencion,
  hasta_no_atencion,
  es_institucional,
  usuario_creacion,
  fecha_creacion
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
)
  RETURNING *;
`;

export const updateEventoQuery = `
UPDATE eventos
SET
  id_eje_tematico = $1,
  id_tipo_evento = $2,
  id_ubicacion = $3,
  id_responsable = $4,
  id_nombre_evento = $5,
  aliado = $6,
  descripcion_grupo = $7,
  no_atencion = $8,
  motivo_no_atencion = $9,
  desde_no_atencion = $10,
  hasta_no_atencion = $11,
  es_institucional = $12,
  usuario_creacion = $13,
  fecha_creacion = $14,
  usuario_modificacion = $14,
  fecha_modificacion = $15

WHERE id = $16
RETURNING *;

`;

export const deleteEventoQuery = `
  DELETE FROM eventos WHERE id = $1;
`;
