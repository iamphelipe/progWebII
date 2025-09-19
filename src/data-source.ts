import "reflect-metadata"
import { DataSource } from "typeorm"
import { Situation } from "./entity/Situations"
import { User } from "./entity/Users"

// Importar variáveis de ambientes
import dotenv from "dotenv"

// Carregar as variáveis do .env
dotenv.config()

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
    entities: [Situation, User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
})


// Inicializar a convexão com o BD

AppDataSource.initialize().then(() => {
  console.log("Conexão com o banco de dados realizado com sucesso!")
}).catch((error) => console.log("Erro com a conexão com o banco de dados!", error))