const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class MovieNotesController{
  async index(request, response){
    const movieNotes = await knex("movie_notes");

    return response.json(movieNotes);
  };

  async show(request, response){
    const { movieNote_id } = request.params;

    const movieNote = await knex("movie_notes").where({ id: movieNote_id }).first();

    if(!movieNote){
      throw new AppError("Movie note não encontrado.");
    };

    return response.json(movieNote);
  };

  async create(request, response){
    const { title, description, rating, tags} = request.body;
    const { user_id } = request.params;

    const user = await knex("users").where({ id: user_id }).first();

    if(!user){
      throw new AppError("Usuário não encontrado.");
    };

    const [ movieNotes ] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return{
        user_id,
        note_id: movieNotes,
        name
      };
    });

    await knex("movie_tags").insert(tagsInsert);

    return response.json();
  };

  async update(request, response){
    const { title, description, rating} = request.body;
    const { movieNote_id } = request.params;

    const movieNote = await knex("movie_notes").where({ id: movieNote_id }).first();

    if(!movieNote){
      throw new AppError("Movie note não encontrado.");
    };

    movieNote.title = title ?? movieNote.title;
    movieNote.description = description ?? movieNote.description;
    movieNote.rating = rating ?? movieNote.rating;

    const { update_movieNote } = await knex("movie_notes").where({ id: movieNote_id }).update({
      title: movieNote.title,
      description: movieNote.description,
      rating: movieNote.rating,
      updated_at: knex.fn.now()
    });

    return response.json();
  };

  async delete(request, response){
    const { movieNote_id } = request.params;

    const movieNote = await knex("movie_notes").where({ id: movieNote_id }).first();

    if(!movieNote){
      throw new AppError("Movie note não encontrado.");
    };

    await knex("movie_notes").where({ id: movieNote_id }).delete();

    return response.json();
  };
};

module.exports = MovieNotesController;