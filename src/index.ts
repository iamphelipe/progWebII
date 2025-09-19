// Importar a biblioteca Express
import express from "express"

// Importar variáveis de ambientes
import dotenv from "dotenv"

// Carregar as variáveis do .env
dotenv.config()

// Criar a Aplicação Express
const app = express()

// Criar um middleware para receber os dados no corpo da requisição
app.use(express.json())

//Incluir os controllers 
import AuthController from  "./controllers/AuthController"
import SituationsController from "./controllers/SituationsController"

// Criar as rotas 
app.use("/", AuthController)
app.use("/", SituationsController)

// Iniciar o servidor na porta 8080
app.listen(process.env.PORT, () => {
   console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
})