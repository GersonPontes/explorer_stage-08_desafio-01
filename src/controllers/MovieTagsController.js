const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class MovietagsController{
  async index(request, response){
    const movieTags = await knex("movie_tags");

    return response.json(movieTags);
  };

  async show(request, response){
    const { movieTag_id } = request.params;

    const movieTag = await knex("movie_tags").where({ id: movieTag_id }).first();

    if(!movieTag){
      throw new AppError("Movie Tag não encontrado.");
    };

    return response.json(movieTag);
  };

  async delete(request, response){
    const { movieTag_id } = request.params;

    const movieTag = await knex("movie_tags").where({ id: movieTag_id }).first();

    if(!movieTag){
      throw new AppError("Movie tag não encontrado.");
    };

    await knex("movie_tags").where({ id: movieTag_id }).delete();

    return response.json();
  };
};

module.exports = MovietagsController;