import { Injectable } from '@nestjs/common'

import type { Env } from './env.types'

@Injectable()
export class EnvService implements Env {
  db = {
    get type() {
      return process.env.DB_TYPE as any
    },

    get host() {
      return process.env.DB_HOST
    },

    get port() {
      return parseInt(process.env.DB_PORT)
    },

    get schema() {
      return process.env.DB_SCHEMA
    },

    get name() {
      return process.env.DB_NAME
    },

    get user() {
      return process.env.DB_USER
    },

    get password() {
      return process.env.DB_PASSWORD
    },
  }
  jwt = {
    get expiresIn() {
      return process.env.JWT_EXPIRES_IN
    },

    get secret() {
      return process.env.JWT_SECRET
    },
  }

  get env() {
    return process.env.NODE_ENV ?? 'development'
  }

  get isDev() {
    return this.env.toLowerCase() === 'development'
  }

  get isProd() {
    return this.env.toLowerCase() === 'production'
  }

  get port() {
    return parseInt(process.env.PORT) ?? 3000
  }
}
