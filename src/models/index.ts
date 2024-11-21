import mongoose from "mongoose";
const { Schema } = mongoose;

// Funcionario Schema
const FuncionarioSchema = new Schema({
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório.'],
      maxlength: [50, 'Nome deve ter no máximo 50 caracteres.'],
      trim: true
    },
    idade: {
      type: Number,
      min: [14, 'Idade mínima é 14 anos.'],
    },
    email: {
      type: String,
      maxlength: [100, "O e-mail pode ter no máximo 60 caracteres"],
      unique: true,
      required: [true, "O e-mail é obrigatório"],
      validate: {
        validator: function (value: string) {
            // expressão regular para validar o formato do e-mail
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value);
        },
        message: (props: any) =>
            `${props.value} não é um formato de e-mail válido`,
        },
    },
    fone: {
      type: String,
      required: [true, 'Telefone é obrigatório.'],
      // match: [/^\d{11}$/, 'Telefone deve conter exatamente 11 números (DDD + número).']
    },
  });
   
  // Cargo Schema
  const CargoSchema = new Schema({
    cbo: {
      type: String,
      required: [true, 'CBO é obrigatório.'],
      //match: [/^\d{7}$/, 'CBO deve conter exatamente 7 números.'],
      //unique: true
    },
    descricao: {
      type: String,
      required: [true, 'Descrição é obrigatória.'],
      trim: true
    },
  });
   
  // Mensalista Schema
  const MensalistaSchema = new Schema({
    matricula: {
      type: Number,
      required: [true, 'Matrícula é obrigatória.'],
      unique: true
    },
    salario: {
      type: Number,
      required: [true, 'Salário é obrigatório.'],
      min: [0, 'Salário não pode ser negativo.']
    },
    funcionario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Funcionario',
      required: [true, 'Funcionário é obrigatório.'],
      unique: true
    },
  });
   
  // Exportando os modelos
  const Funcionario = mongoose.model('Funcionario', FuncionarioSchema);
  const Cargo = mongoose.model('Cargo', CargoSchema);
  const Mensalista = mongoose.model('Mensalista', MensalistaSchema);
  
  export { Funcionario, Cargo, Mensalista };