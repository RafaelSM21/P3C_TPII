import { Router, Request, Response } from "express";
import Funcionario from "./Funcionario";
import Cargo from "./Cargo";
import Mensalista from "./Mensalista";


const routes = Router();
routes.use("/funcionario", Funcionario);
routes.use("/cargo", Cargo);
routes.use("/mensalista", Mensalista);

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;