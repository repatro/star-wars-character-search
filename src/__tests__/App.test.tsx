import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import App from '../App';
import * as api from '../API';
import { swCharactersExample } from '../__mocks__/dataExamples';

jest.mock('../API');

const mockedApi = api as jest.Mocked<typeof api>;

describe('App', () => {
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
