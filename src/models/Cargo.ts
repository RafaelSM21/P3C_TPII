class CargoModel {
    id: string = "";
    cbo: string;
    descricao: string;

    constructor(cbo: string, descricao: string) {
        this.cbo = cbo;
        this.descricao = descricao;
    }
}

export default CargoModel;
