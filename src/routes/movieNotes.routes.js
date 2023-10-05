const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRouter = Router();

const movieNotesController = new MovieNotesController();

movieNotesRouter.get("/", movieNotesController.index);
movieNotesRouter.get("/:movieNote_id", movieNotesController.show);
movieNotesRouter.post("/:user_id", movieNotesController.create);
movieNotesRouter.put("/:movieNote_id", movieNotesController.update);
movieNotesRouter.delete("/:movieNote_id", movieNotesController.delete);

module.exports = movieNotesRouter;