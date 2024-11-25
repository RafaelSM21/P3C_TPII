import express from "express";
import dotenv from "dotenv";
import connect from "./models/connection";
import routes from "./routes/index"; // Supondo que a rota esteja correta

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// Suporte para body JSON
app.use(express.json());

// Conectar ao MongoDB
connect();

// Usar as rotas
app.use(routes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
