import { ISWCharacter, ISWFilm } from '../types';

export const swCharactersExample: Array<ISWCharacter> = [
  {
    name: 'Char Name 1',
    birth_year: '19BBY',
    eye_color: 'brown',
    hair_color: 'black',
    skin_color: 'green',
    gender: 'male',
    height: '172',
    mass: '70',
    films: []
  },
  {
    name: 'Char Name 2',
    birth_year: '22BBY',
    eye_color: 'yellow',
    hair_color: 'white',
    skin_color: 'white',
    gender: 'female',
    height: '175',
    mass: '55',
    films: []
  },
  {
    name: 'Someone New',
    birth_year: '50BBY',
    eye_color: 'green',
    hair_color: 'red',
    skin_color: 'green',
    gender: 'unknown',
    height: '190',
    mass: '95',
    films: []
  }
];

export const swFilmExample: ISWFilm = {
  title: 'Title',
  episode_id: 4,
  url: 'http://someurl.com'
};
