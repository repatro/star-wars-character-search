import React from 'react';
import { render, waitFor } from '@testing-library/react';

import * as api from '../../API';
import FilmLabel from '../FilmLabel';
import { swFilmExample } from '../../__mocks__/dataExamples';

jest.mock('../../API');

const mockedApi = api as jest.Mocked<typeof api>;

describe('FilmLabel', () => {
  beforeEach(() => {
    mockedApi.getSWFilmByUrl.mockReset();
    mockedApi.getSWFilmByUrl.mockImplementation((search?: string) => ({
      getData: async () => Promise.resolve(swFilmExample),
      abort: () => {}
    }));
  });

  it('should load episode only if visible', async () => {
    const { rerender } = render(<FilmLabel url={swFilmExample.url} />);
    expect(mockedApi.getSWFilmByUrl).not.toBeCalled();
    rerender(<FilmLabel url={swFilmExample.url} isVisible />);
    await waitFor(() => expect(mockedApi.getSWFilmByUrl).toHaveBeenCalledTimes(1));
  });

  it('should render episode name only when entity is fetched', async () => {
    const { findByText, getByText, rerender } = render(<FilmLabel url={swFilmExample.url} />);
    expect(getByText('Loading...')).toBeTruthy();
    rerender(<FilmLabel url={swFilmExample.url} isVisible />);
    expect(await findByText(swFilmExample.title)).toBeTruthy();
  });
});
