// Importar a biblioteca Express
import express, {Request, Response} from "express"

// Importar o arquivo com as credenciais do banco de dados
import { AppDataSource } from "../data-source"

// Criar a Aplicação Express
const router = express.Router()

// Inicializar a convexão com o BD

AppDataSource.initialize().then(() => {
  console.log("Conexão com o banco de dados realizado com sucesso!")
}).catch((error) => console.log("Erro com a conexão com o banco de dados!", error))

// Criar a rota GET principal
 router.get("/", (req: Request, res: Response) => {
   res.send("Bem vindo, pessoal! Tela de login da rota!")
})

// Exportar a instrução da rota

export default router