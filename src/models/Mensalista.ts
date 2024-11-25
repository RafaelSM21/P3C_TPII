import mongoose from "mongoose";

class MensalistaModel {
    id: string = "";
    matricula: number;
    salario: number;
    funcionario: mongoose.Types.ObjectId;

    constructor(matricula: number, salario: number, funcionarioId: mongoose.Types.ObjectId) {
        this.matricula = matricula;
        this.salario = salario;
        this.funcionario = funcionarioId; // Chave estrangeira para associar ao Funcionario
    }
}

export default MensalistaModel;
