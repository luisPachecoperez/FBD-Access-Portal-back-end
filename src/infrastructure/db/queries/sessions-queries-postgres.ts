    
export const getAllSessionsQuery = `
  SELECT * FROM public.sessions;
`;

export const getSessionByIdQuery = `
  SELECT * FROM public.sessions WHERE session_id = $1;
`;

export const createSessionQuery = `
  INSERT INTO sessions ( session_id,user_id, user_email, user_name, user_picture, ip, ua, created_at, last_access, expires_at, revoked, user_uuid)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)
  RETURNING *;
`;

export const updateSessionQuery = `
  UPDATE sessions 
  SET user_id=$1, user_email=$2, user_name=$3, user_picture=$4, ip=$5, ua=$6, created_at=$7, last_access=$8, expires_at=$9, revoked=$10, user_uuid=$11
  WHERE session_id = $12 
  RETURNING *;
`;

export const deleteSessionQuery = `
  DELETE FROM sessions WHERE session_id = $1;
`;
