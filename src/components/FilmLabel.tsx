import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getSWFilmByUrl } from '../API';
import { IFetchedEntity, ISWFilm } from '../types';

const numberToRoman: { [index: number]: string } = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI'
};

interface IFilmLabelProps {
  url: string;
  isVisible?: boolean;
}
function FilmLabel({ url, isVisible }: IFilmLabelProps) {
  const [filmData, setFilmData] = useState<IFetchedEntity<ISWFilm>>({ isLoading: false });

  useEffect(() => {
    if (isVisible) {
      const { getData, abort } = getSWFilmByUrl(url);
      setFilmData({ isLoading: true, abortLoading: abort });
      getData()
        .then((entity) => setFilmData({ entity, isLoading: false }))
        .catch((e) => e.name !== 'AbortError' && setFilmData({ ...filmData, isLoading: false, error: e.message }));
    }
    return () => filmData.abortLoading?.();
  }, [url, isVisible]);

  useEffect(() => {
    if (!isVisible) {
      filmData.abortLoading?.();
    }
  }, [isVisible]);

  function renderLoadingLabel() {
    return (
      <Label>
        <FilmName>Loading...</FilmName>
      </Label>
    );
  }

  function renderLabel(entity: ISWFilm) {
    return (
      <Label>
        <FilmNumber>{numberToRoman[entity.episode_id] || entity.episode_id}</FilmNumber>
        <FilmName>{entity.title}</FilmName>
      </Label>
    );
  }

  if (!filmData.entity) {
    return (
      <Label>
        <FilmName>Loading...</FilmName>
      </Label>
    );
  }

  return filmData.entity ? renderLabel(filmData.entity) : renderLoadingLabel();
}

const Label = styled.div`
  display: inline-block;
  margin: 3px;
  font-size: 10px;
  color: #e0dddd;
  background-color: #101114;
  border: 2px solid #3f3e3e;
  border-radius: 6px;
`;

const FilmName = styled.span`
  display: inline-block;
  padding: 5px;
`;

const FilmNumber = styled.span`
  border-right: 2px solid #3f3e3e;
  padding: 5px;
`;

export default FilmLabel;
