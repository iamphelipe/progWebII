// Importar a biblioteca Express
import express, {Request, Response} from "express"
import { AppDataSource } from "../data-source"
import { Situation } from "../entity/Situations"

// Criar a Aplicação Express
const router = express.Router()

// Criar a Lista
 router.get("/situations", async(req: Request, res: Response) => {
  
  try {
    const situationRepository = AppDataSource.getRepository(Situation);

    // Receber o número da página e definir página 1 como padrão
    const page =  Number(req.query.page) || 1

    // Definir o limite de registros por páginas
    const limite = 1

    // Contar o total de registros no banco de dados
    const totalSituations = await situationRepository.count()

    // Verificar se existem registros
    if(totalSituations === 0) {
      res.status(400).json({
      message: 'Nenhuma sistuação encontrada!',
     })
     return
    }

    // Calcular a última página
    const lastPage = Math.ceil(totalSituations / limite)

    // Verificar se a página solicitada é válida
    if(page > lastPage) {
      res.status(400).json({
      message: `Página inválida. O total de páginas é ${lastPage}`,
     })
     return
    }

    // Calcular o offset (a partir de qual registro começar a busca)
    const offset = (page - 1) * limite

    // Retornar as situações do banco de dados com paginação 
    const situations = await situationRepository.find({
      take: limite,
      skip: offset,
      order: {id: "DESC"}
    })

    // Retornar a resposta com os dados e informações da paginação
    res.status(200).json({
      currentPage: page,
      lastPage,
      totalSituations,
      situations
    })
    return

  }catch(error){
      res.status(500).json({
       message: 'Erro ao listar situação!',
     });
     return
  }
})

// Criar a Visualização do item cadastrado em situação
 router.get("/situations/:id", async(req: Request, res: Response) => {
  
  try {

    const {id} = req.params;

    const situationRepository = AppDataSource.getRepository(Situation);
    const situation = await situationRepository.findOneBy({id: Number(id)})

    if(!situation) {
      res.status(404).json({
        message: 'Situação não encontrada!',
     });
     return
    }

    res.status(200).json(situation)
    return

  } catch(error){
      res.status(500).json({
       message: 'Erro ao visualizar situação!',
     });
     return
  }
})

// Cadastra item no banco de dados
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

// Faz a atualização do item cadastrado em situação
 router.put("/situations/:id", async(req: Request, res: Response) => {
  
  try {

    const {id} = req.params;

    var data = req.body;

    const situationRepository = AppDataSource.getRepository(Situation);
    const situation = await situationRepository.findOneBy({id: Number(id)})

    if(!situation) {
      res.status(404).json({
        message: 'Situação não encontrada!',
     });
     return
    }

    //Atualiza os dados
    situationRepository.merge(situation, data)

    //Salvar as alterações de dados
    const updateSituation = await situationRepository.save(situation)

     res.status(200).json({
       message: 'Situação atualizada com sucesso!',
       situation: updateSituation,
     });

  }catch(error){
      res.status(500).json({
       message: 'Erro ao atualizar situação!',
     });
     return
  }
})

// Remove o item cadastrado no banco de dados
 router.delete("/situations/:id", async(req: Request, res: Response) => {
  
  try {

    const {id} = req.params;

    const situationRepository = AppDataSource.getRepository(Situation);
    const situation = await situationRepository.findOneBy({id: Number(id)})

    if(!situation) {
      res.status(404).json({
        message: 'Situação não encontrada!',
     });
     return
    }

    //Remover os dados no banco de dados
    await situationRepository.remove(situation)

     res.status(200).json({
       message: 'Situação foi removida com sucesso!',
     });

  }catch(error){
      res.status(500).json({
       message: 'Erro ao atualizar situação!',
     });
     return
  }
})

// Exportar a instrução da rota

export default router