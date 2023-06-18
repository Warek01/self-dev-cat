import 'dotenv/config'

import type { IConfig } from '../types'

export default (): IConfig => ({
  env: 'development',
  port: 3000,
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    schema: 'public',
    name: 'self_dev_cat_db',
    user: 'warek',
    synchronize: true,
    password: process.env.DB_PASSWORD,
    entities: ['**/*.entity.js'],
  },
  jwt: {
    expiresIn: '7d',
    secret: process.env.JWT_SECRET
  }
})
