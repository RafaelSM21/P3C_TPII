import mongoose from "mongoose";

class MensalistaModel {
    static find() {
        throw new Error("Method not implemented.");
    }
    static findByIdAndDelete(id: any) {
        throw new Error("Method not implemented.");
    }
    static findById(id: any) {
        throw new Error("Method not implemented.");
    }
    id: string = "";
    matricula: number;
    salario: number;
    funcionarioId: mongoose.Types.ObjectId;

    constructor(matricula: number, salario: number, funcionarioId: mongoose.Types.ObjectId) {
        this.matricula = matricula;
        this.salario = salario;
        this.funcionarioId = funcionarioId; // Chave estrangeira para associar ao Funcionario
    }
}

export default MensalistaModel;
