const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get("/", usersController.index);
usersRouter.get("/:id", usersController.show);
usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.update);
usersRouter.delete("/:id", usersController.delete);

module.exports = usersRouter;