const { Router } = require("express");
const routes = Router();
const UserController = require("../controllers/UserController");


//Criar Users
routes.post("/register", UserController.create);
//Recuperar todos os registros de Users
routes.get("/", UserController.index);
//Recuperar registro por ID
routes.get("/:cpf", UserController.show);
//Atualizar registro com ID
routes.put("/:id", UserController.update);
//Deletar registro com ID
routes.delete("/:id", UserController.delete);

module.exports = routes;
