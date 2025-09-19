"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importar a biblioteca Express
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Situations_1 = require("../entity/Situations");
// Criar a Aplicação Express
const router = express_1.default.Router();
// Criar a Lista
router.get("/situations", async (req, res) => {
    try {
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situations = await situationRepository.find();
        res.status(200).json(situations);
        return;
    }
    catch (error) {
        res.status(500).json({
            message: 'Erro ao listar situação!',
        });
        return;
    }
});
// Criar a Visualização do item cadastrado em situação
router.get("/situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = await situationRepository.findOneBy({ id: Number(id) });
        if (!situation) {
            res.status(404).json({
                message: 'Situação não encontrada!',
            });
            return;
        }
        res.status(200).json(situation);
        return;
    }
    catch (error) {
        res.status(500).json({
            message: 'Erro ao visualizar situação!',
        });
        return;
    }
});
// Cadastra item no banco de dados
router.post('/situations', async (req, res) => {
    try {
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const newSituation = situationRepository.create(data);
        await situationRepository.save(newSituation);
        res.status(201).json({
            message: 'Situação cadastrada com sucesso!',
            situation: newSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Erro ao cadastrar situação!',
        });
    }
});
// Faz a atualização do item cadastrado em situação
router.put("/situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = await situationRepository.findOneBy({ id: Number(id) });
        if (!situation) {
            res.status(404).json({
                message: 'Situação não encontrada!',
            });
            return;
        }
        //Atualiza os dados
        situationRepository.merge(situation, data);
        //Salvar as alterações de dados
        const updateSituation = await situationRepository.save(situation);
        res.status(200).json({
            message: 'Situação atualizada com sucesso!',
            situation: updateSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar situação!',
        });
        return;
    }
});
// Remove o item cadastrado no banco de dados
router.delete("/situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = await situationRepository.findOneBy({ id: Number(id) });
        if (!situation) {
            res.status(404).json({
                message: 'Situação não encontrada!',
            });
            return;
        }
        //Remover os dados no banco de dados
        await situationRepository.remove(situation);
        res.status(200).json({
            message: 'Situação foi removida com sucesso!',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar situação!',
        });
        return;
    }
});
// Exportar a instrução da rota
exports.default = router;
