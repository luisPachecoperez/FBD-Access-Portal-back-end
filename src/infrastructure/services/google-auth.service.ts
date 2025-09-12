//Obligatorio para seguridad
import { OAuth2Client } from 'google-auth-library';

// Clase normal sin decoradores
export class GoogleAuthService {
  private client: OAuth2Client;

  constructor(clientId?: string, clientSecret?: string) {
    this.client = new OAuth2Client(
      clientId || process.env.GOOGLE_CLIENT_ID,
      clientSecret || process.env.GOOGLE_CLIENT_SECRET
    );
  }

  async verifyToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      
      return {
        success: true,
        user: {
          id: payload?.sub || '',
          email: payload?.email || '',
          name: payload?.name || '',
          picture: payload?.picture || ''
        }
      };
    } catch (error) {
      console.error('Google token verification error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}