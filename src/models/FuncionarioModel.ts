class FuncionarioModel {
    static findById(funcionarioId: any) {
        throw new Error("Method not implemented.");
    }
    id:string = ""
    nome:string;
    idade: number;
    email:string;
    fone: string;

    constructor(nome:string, idade: number, email:string, fone: string){
        this.nome = nome;
        this.idade = idade;
        this.email = email;
        this.fone = fone;
    }
}

export default FuncionarioModel;