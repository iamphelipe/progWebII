import "reflect-metadata"
import { DataSource } from "typeorm"

const dialect  = process.env.DB_DIALECT ?? "mysql"
export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "mariadb" | "postgres" | "mongodb",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DT_PORT ? parseInt(process.env.DT_PORT) : 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "1706Pvg@",
    database: process.env.DB_DATABASE || "nodeapi",
    synchronize: false,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})