declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

interface Env {
  readonly NODE_ENV: string
  readonly PORT: string
  readonly DB_TYPE: string
  readonly DB_HOST: string
  readonly DB_PORT: string
  readonly DB_SCHEMA: string
  readonly DB_NAME: string
  readonly DB_USER: string
  readonly DB_PASSWORD: string
  readonly JWT_EXPIRES_IN: string
  readonly JWT_SECRET: string
}

export type {}
