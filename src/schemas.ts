import Joi from 'joi';

export const swCharactersSchema = Joi.array()
  .items(
    Joi.object({
      name: Joi.string().required(),
      birth_year: Joi.string().required(),
      eye_color: Joi.string().required(),
      gender: Joi.string().required(),
      hair_color: Joi.string().required(),
      height: Joi.string().required(),
      mass: Joi.string().required(),
      skin_color: Joi.string().required(),
      films: Joi.array().items(Joi.string()).required(),
      homeworld: Joi.string().required()
    })
  )
  .required();

export const swFilmSchema = Joi.object({
  title: Joi.string().required(),
  episode_id: Joi.number().required(),
  url: Joi.string().required()
}).required();

export const swHomeworldSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required()
});
