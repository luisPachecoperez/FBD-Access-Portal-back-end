    
export const getAllDepartamentosQuery = `
  SELECT * FROM public.departamentos  order by nombre;
`;

export const getDepartamentoByIdQuery = `
  SELECT * FROM public.departamentos WHERE id = $1;
`;

export const createDepartamentoQuery = `
  INSERT INTO Departamentos ( nombre, codigo_dane, pais_id)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

export const updateDepartamentoQuery = `
  UPDATE departamentos 
  SET nombre = $1, codigo_dane = $2, pais_id = $3
  WHERE id = $4 
  RETURNING *;
`;

export const deleteDepartamentoQuery = `
  DELETE FROM departamentos WHERE id = $1;
`;
