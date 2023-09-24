export interface Env {
  readonly env: string
  readonly isDev: boolean
  readonly isProd: boolean
  readonly port: number
  readonly db: DbEnv
  readonly jwt: JwtEnv
}

export interface DbEnv {
  readonly type: any
  readonly host: string
  readonly port: number
  readonly schema: string
  readonly name: string
  readonly user: string
  readonly password: string
}

export interface JwtEnv {
  readonly expiresIn: string
  readonly secret: string
}
