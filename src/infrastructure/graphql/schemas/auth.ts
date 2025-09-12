// src/infrastructure/graphql/schemas/beneficiarios.ts
import { buildSchema } from 'graphql'

export const authSchema = buildSchema(`

    type User {
        id: ID!
        email: String!
        nombre: String
        photoUrl: String
    }
    
    type AuthResponse {
        success: Boolean!
        message: String
        user: User
    }
    
    type Mutation {
        googleLogin(token: String!): AuthResponse!
    }
  
`);
