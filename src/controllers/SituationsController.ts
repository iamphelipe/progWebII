// Importar a biblioteca Express
import express, {Request, Response} from "express"
import { AppDataSource } from "../data-source"
import { Situation } from "../entity/Situations"

// Criar a Aplicação Express
const router = express.Router()

// Criar a rota GET principal
 router.get("/situations", (req: Request, res: Response) => {
   res.send("Bem vindo, pessoal! Tela de situations da rota!")
})

// Criar a rota POST
 router.post('/situations', async (req: Request, res: Response) => {
   try {
     var data = req.body;

     const situationRepository = AppDataSource.getRepository(Situation);
     const newSituation = situationRepository.create(data);

     await situationRepository.save(newSituation);

     res.status(201).json({
       message: 'Situação cadastrada com sucesso!',
       situation: newSituation,
     });
   } catch (error) {
     res.status(500).json({
       message: 'Erro ao cadastrar situação!',
     });
   }
 });

// Exportar a instrução da rota

export default router