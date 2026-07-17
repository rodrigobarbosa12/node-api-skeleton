import 'dotenv/config'
import * as path from 'node:path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const { HOST_DB, PORT_DB, USER_DB, PASSWORD_DB, DATABASE_DB } = process.env

const dataSource = new DataSource({
  type: 'postgres',
  host: HOST_DB,
  port: Number(PORT_DB),
  username: USER_DB,
  password: PASSWORD_DB,
  database: DATABASE_DB,
  logging: false,
  migrations: [path.join(__dirname, 'migrations/*.js')],
})

export default dataSource
