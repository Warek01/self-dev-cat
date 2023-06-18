export interface JwtResponse {
  access_token: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      JWT_EXPIRES_IN: string
    }
  }
}

export type {}
