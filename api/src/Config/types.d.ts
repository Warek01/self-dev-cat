export interface IConfig {
  env: 'production' | 'development'
  port: number
  db: IDBConfig
  jwt: IJWTConfig
}

export interface IDBConfig {
  port: number
  host: string
  user: string
  password: string
  name: string
  type: any
  synchronize: boolean
  schema: string
  entities: any[]
}

export interface IJWTConfig {
  secret: string
  expiresIn: string
}
