import { AppDataSource } from "./data-source"
import CreateSituationSeeds from "./seeds/CreateSituationSeeds"

const runSeeds =  async() => {
   console.log("Conectando ao banco de dados...")

   await AppDataSource.initialize()
   console.log("Banco de dados conectado!")

   try {
      // Cria a instancia da classes de seed
      const situationsSeeds = new CreateSituationSeeds()

      // Executa as Seeds
      await situationsSeeds.run(AppDataSource)

   } catch(error) {
      console.log("Erro ao execeutar o seed:", error)
   } finally {
      await AppDataSource.destroy()
      console.log("Finalizar conexão com o banco de dados encerrada.")
   }
}

runSeeds()