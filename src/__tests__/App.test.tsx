import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import App from '../App';
import * as api from '../API';
import { ISWCharacter } from '../types';

jest.mock('../API');

const mockedApi = api as jest.Mocked<typeof api>;

describe('App', () => {
  const swCharactersExample: Array<ISWCharacter> = [
    {
      name: 'Char Name 1',
      birth_year: '19BBY',
      eye_color: 'brown',
      hair_color: 'black',
      skin_color: 'green',
      gender: 'male',
      height: '172',
      mass: '70'
    },
    {
      name: 'Char Name 2',
      birth_year: '22BBY',
      eye_color: 'yellow',
      hair_color: 'white',
      skin_color: 'white',
      gender: 'female',
      height: '175',
      mass: '55'
    },
    {
      name: 'Someone New',
      birth_year: '50BBY',
      eye_color: 'green',
      hair_color: 'red',
      skin_color: 'green',
      gender: 'unknown',
      height: '190',
      mass: '95'
    }
  ];

  beforeEach(() => {
    mockedApi.getSWCharacters.mockReset();
    mockedApi.getSWCharacters.mockImplementation((search?: string) => ({
      getData: async () => {
        const result = search
          ? swCharactersExample.filter(({ name }) => name.toLowerCase().includes(search))
          : swCharactersExample.slice(0, 2);
        return Promise.resolve(result);
      },
      abort: () => {}
    }));
  });

  it('should show characters on start', async () => {
    const { findByText } = render(<App />);
    expect(await findByText('Char Name 1')).toBeTruthy();
  });

  it('should search for a character', async () => {
    const { findByText, getByPlaceholderText } = render(<App />);
    await waitFor(() => expect(mockedApi.getSWCharacters).toHaveBeenCalled());
    const searchInput = getByPlaceholderText('Search...');
    mockedApi.getSWCharacters.mockClear();

    searchInput &&
      fireEvent.change(searchInput, {
        target: { value: 'Som' }
      });

    expect(await findByText('Someone New')).toBeTruthy();
  });
});
