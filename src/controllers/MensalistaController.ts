import { Request, Response } from "express";
import { Mensalista, Funcionario } from "../models";

class MensalistaController {

    // Create
    public async create(req: Request, res: Response): Promise<Response> {
        const { matricula, salario, funcionarioId } = req.body; // Certifique-se de que 'funcionarioId' é passado corretamente
        try {
            // Verificar se o funcionário existe
            const funcionarioExistente = await Funcionario.findById(funcionarioId);
            if (!funcionarioExistente) {
                return res.status(404).json({ message: "Funcionário inexistente!" });
            }

            // Criar o novo Mensalista com o funcionarioId correto
            const document = new Mensalista({ matricula, salario, funcionarioId });
            const resp = await document.save();
            return res.status(201).json(resp);
        } catch (error: any) {
            if (error.code === 11000) {
                return res.status(400).json({ message: "Matrícula já está em uso" });
            } else if (error.errors?.["matricula"]) {
                return res.status(400).json({ message: error.errors["matricula"].message });
            } else if (error.errors?.["salario"]) {
                return res.status(400).json({ message: error.errors["salario"].message });
            } else if (error.errors?.["funcionarioId"]) {
                return res.status(400).json({ message: error.errors["funcionarioId"].message });
            }
            return res.status(400).json({ message: error.message });
        }
    }

    // List
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const objects = await Mensalista.find()
                .populate("funcionarioId")  // Preenche a referência com as informações do Funcionario
                .sort({ matricula: "asc" });
            return res.status(200).json(objects);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body;
        try {
            const object = await Mensalista.findByIdAndDelete(_id);
            if (object) {
                return res.status(200).json({ message: "Mensalista excluído com sucesso!" });
            } else {
                return res.status(404).json({ message: "Mensalista inexistente!" });
            }
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, matricula, salario, funcionarioId } = req.body;
        try {
            // Verificar se o mensalista existe
            const document = await Mensalista.findById(id);
            if (!document) {
                return res.status(404).json({ message: "Mensalista inexistente!" });
            }

            // Verificar se o funcionário existe
            const funcionarioExistente = await Funcionario.findById(funcionarioId);
            if (!funcionarioExistente) {
                return res.status(404).json({ message: "Funcionário inexistente!" });
            }

            // Atualizar os campos
            document.matricula = matricula;
            document.salario = salario;
            document.funcionarioId = funcionarioId; // Atualizando o campo funcionarioId corretamente

            await document.save();
            return res.status(200).json(document);
        } catch (error: any) {
            if (error.code === 11000) {
                return res.status(400).json({ message: "Matrícula já está em uso" });
            } else if (error.errors?.["matricula"]) {
                return res.status(400).json({ message: error.errors["matricula"].message });
            } else if (error.errors?.["salario"]) {
                return res.status(400).json({ message: error.errors["salario"].message });
            } else if (error.errors?.["funcionarioId"]) {
                return res.status(400).json({ message: error.errors["funcionarioId"].message });
            }
            return res.status(400).json({ message: error.message });
        }
    }
}

export default new MensalistaController();
