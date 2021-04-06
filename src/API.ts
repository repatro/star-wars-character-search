import Joi, { Schema } from 'joi';

import { ISWCharacter } from './types';

const SW_API_URL = 'https://swapi.dev/api';

const swCharactersSchema = Joi.array()
  .items(
    Joi.object({
      name: Joi.string().required(),
      birth_year: Joi.string().required(),
      eye_color: Joi.string().required(),
      gender: Joi.string().required(),
      hair_color: Joi.string().required(),
      height: Joi.string().required(),
      mass: Joi.string().required(),
      skin_color: Joi.string().required()
    })
  )
  .required();

export function getSWCharacters(search?: string) {
  const paramsPart = search ? `?search=${search}` : '';
  return abortableFetch<Array<ISWCharacter>>(`${SW_API_URL}/people/${paramsPart}`, swCharactersSchema, 'results');
}

export function abortableFetch<DataType>(url: string, schema: Schema, field?: string) {
  const controller = new AbortController();
  const signal = controller.signal;

  async function getData(): Promise<DataType> {
    const fetched = await fetch(url, { signal });
    const data = field ? (await fetched.json())[field] : await fetched.json();
    const result = schema.validate(data, { allowUnknown: true, stripUnknown: true });
    if (result.error) {
      throw new Error('Data validation failed');
    }
    return result.value;
  }

  return {
    getData,
    abort: controller.abort
  };
}
