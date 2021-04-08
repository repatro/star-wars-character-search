import { Schema } from 'joi';

import { swCharactersSchema, swFilmSchema, swHomeworldSchema } from './schemas';
import { ISWCharacter, ISWFilm, ISWHomeworld } from './types';

const SW_API_URL = 'https://swapi.dev/api';

const swCharactersDataFetch = getFetchData<Array<ISWCharacter>>(swCharactersSchema, 'results');
export function getSWCharacters(search?: string) {
  const paramsPart = search ? `?search=${search}` : '';
  return swCharactersDataFetch(`${SW_API_URL}/people/${paramsPart}`);
}

const swFilmByUrlDataFetch = getFetchData<ISWFilm>(swFilmSchema, undefined, true);
export function getSWFilmByUrl(url: string) {
  return swFilmByUrlDataFetch(url);
}

const swHomeworldByUrlDataFetch = getFetchData<ISWHomeworld>(swHomeworldSchema, undefined, true);
export function getSWHomeworldByUrl(url: string) {
  return swHomeworldByUrlDataFetch(url);
}

function getFetchData<DataType>(schema: Schema, field?: string, useCache?: boolean) {
  const fetchCache: { [url: string]: DataType } = {};

  return function (url: string) {
    return abortableFetch(url, schema, field, useCache ? fetchCache : undefined);
  };
}

export function abortableFetch<DataType>(
  url: string,
  schema: Schema,
  field?: string,
  cache?: { [url: string]: DataType }
) {
  const controller = new AbortController();
  const signal = controller.signal;

  async function getData(): Promise<DataType> {
    if (cache && url in cache) {
      return cache[url];
    }
    const fetched = await fetch(url, { signal });
    const data = field ? (await fetched.json())[field] : await fetched.json();
    const result = schema.validate(data, { allowUnknown: true, stripUnknown: true });
    if (result.error) {
      throw new Error('Data validation failed');
    }
    if (cache) {
      cache[url] = result.value;
    }
    return result.value;
  }

  return {
    getData,
    abort: () => {
      controller.abort();
    }
  };
}
