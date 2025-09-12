    
export const getAllBeneficiariosQuery = `
  SELECT * FROM public.beneficiarios where  fecha_nacimiento is not  null order by 1;
`;

export const getBeneficiarioByIdQuery = `
  SELECT * FROM public.beneficiarios WHERE id = $1;
`;

export const createBeneficiarioQuery = `
  INSERT INTO beneficiarios (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, genero, tipo_documento, numero_documento, direccion, telefono, correo, estado, fecha_registro, fecha_actualizacion)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
`;

export const updateBeneficiarioQuery = `
  UPDATE beneficiarios 
  SET primer_nombre = $1, segundo_nombre = $2, primer_apellido = $3, segundo_apellido = $4, fecha_nacimiento = $5, genero = $6, tipo_documento = $7, numero_documento = $8, direccion = $9, telefono = $10, correo = $11, estado = $12, fecha_registro = $13, fecha_actualizacion = $14 
  WHERE beneficiario_id = $15 
  RETURNING *;
`;

export const deleteBeneficiarioQuery = `
  DELETE FROM beneficiarios WHERE beneficiario_id = $1;
`;
