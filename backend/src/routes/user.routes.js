const { Router } = require("express");
const routes = Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require('../middlewares/auth');



//Criar Users
routes.post("/register", UserController.create);

//Recuperar todos os registros de Users
routes.get("/", authMiddleware, UserController.index);
routes.post("/authenticate", UserController.login);

//Recuperar registro por ID
routes.get("/:id", UserController.show);

//Atualizar registro com ID
routes.put("/:id", UserController.update);

//Deletar registro com ID

routes.delete("/:id", UserController.delete);

module.exports = routes;
