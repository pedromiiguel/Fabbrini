const { Router } = require("express");
const routes = Router();
const ScreeningController = require("../controllers/ScreeningController");

routes.get("/result", ScreeningController.result);
routes.post("/", ScreeningController.create);
routes.get("/", ScreeningController.index);
routes.get("/:id", ScreeningController.show);
routes.put("/:id", ScreeningController.update);
routes.delete("/:id", ScreeningController.delete);


module.exports = routes;
