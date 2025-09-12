    
export const getAllMunicipiosQuery = `
SELECT * FROM public.municipios  order by nombre;
`;

export const getMunicipioByIdQuery = `
SELECT * FROM public.municipios WHERE id = $1;
`;

export const createMunicipioQuery = `
INSERT INTO municipios ( nombre, codigo_dane, departamento_id)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const updateMunicipioQuery = `
UPDATE municipios 
SET nombre = $1, codigo_dane = $2, departamento_id = $3
WHERE id = $4 
RETURNING *;
`;

export const deleteMunicipioQuery = `
DELETE FROM municipios WHERE id = $1;
`;
