import { Request, Response } from "express";
import { Mensalista, Funcionario } from "../models"; // Certifique-se de que os modelos estão corretos

class MensalistaController {

    // Create (POST)
    public async create(req: Request, res: Response): Promise<Response> {
        const { matricula, salario, funcionarioId } = req.body; // 'funcionarioId' é o ID do Funcionario

        try {
            // Verificar se o funcionário existe
            const funcionarioExistente = await Funcionario.findById(funcionarioId);
            if (!funcionarioExistente) {
                return res.status(404).json({ message: "Funcionário inexistente!" });
            }

            // Criar o novo Mensalista com o funcionarioId
            const document = new Mensalista({ matricula, salario, funcionario: funcionarioId }); // Atualizando para 'funcionario'
            const resp = await document.save(); // Salvar o Mensalista no banco de dados

            return res.status(201).json(resp); // Retorna o Mensalista criado com status 201
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
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

    // List (GET)
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const objects = await Mensalista.find()
                .populate("funcionario")  // Usando 'funcionario' que é o nome correto no modelo
                .sort({ matricula: "asc" }); // Ordena pelo número da matrícula

            return res.status(200).json(objects); // Retorna a lista de Mensalistas
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Delete (DELETE)
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body; // Obtendo o ID do Mensalista

        try {
            const object = await Mensalista.findByIdAndDelete(_id); // Exclui o Mensalista pelo ID
            if (object) {
                return res.status(200).json({ message: "Mensalista excluído com sucesso!" });
            } else {
                return res.status(404).json({ message: "Mensalista inexistente!" });
            }
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Update (PUT)
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, matricula, salario, funcionarioId } = req.body; // Recebe o ID, matricula, salario e funcionarioId

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

            // Atualizar os campos do Mensalista
            document.matricula = matricula;
            document.salario = salario;
            document.funcionario = funcionarioId; // Atualizando a referência para o Funcionario

            await document.save();  // Salva as alterações
            return res.status(200).json(document);  // Retorna o Mensalista atualizado
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
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
