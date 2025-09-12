// src/domain/models/Sessions.ts
export class Session {
  constructor(
    public session_id: string,
    public user_id: string,
    public user_email: string,
    public user_name: string,
    public user_picture: string | null = null,
    public ip: string,
    public ua: string,
    public created_at: Date,
    public last_access: Date,
    public expires_at: Date,
    public revoked: boolean = false,
    public user_uuid: string | null = null
  ) 
  {}
}
