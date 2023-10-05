const { Router } = require("express");
const MovieTagsController = require("../controllers/MovieTagsController");

const movieTagsRouter = Router();

const movieTagsController = new MovieTagsController();

movieTagsRouter.get("/", movieTagsController.index);
movieTagsRouter.get("/:movieTag_id", movieTagsController.show);
movieTagsRouter.delete("/:movieTag_id", movieTagsController.delete);

module.exports = movieTagsRouter;