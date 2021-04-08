import React from 'react';
import styled from 'styled-components';

import { ISWCharacter } from '../types';
import FilmLabel from './FilmLabel';

interface ICharacterInfoTableProps {
  character: ISWCharacter;
  isVisible?: boolean;
}
function CharacterInfoTable({ character, isVisible }: ICharacterInfoTableProps) {
  return (
    <InfoTable>
      <tbody>
        <tr>
          <th>Gender</th>
          <td>{character.gender}</td>
          <th>Birth Year</th>
          <td>{character.birth_year}</td>
        </tr>
        <tr>
          <th>Height</th>
          <td>{character.height}cm</td>
          <th>Mass</th>
          <td>{character.mass}kg</td>
        </tr>
        <tr>
          <th>Hair Color</th>
          <td>{character.hair_color}</td>
          <th>Skin Color</th>
          <td>{character.skin_color}</td>
        </tr>
        <tr>
          <th>Eye Color</th>
          <td>{character.eye_color}</td>
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th>Films</th>
          <td colSpan={3}>
            {character.films.map((url, idx) => (
              <FilmLabel key={idx} url={url} isVisible={isVisible} />
            ))}
          </td>
        </tr>
      </tbody>
    </InfoTable>
  );
}

export default CharacterInfoTable;

const tableBorderColor = '#575656';
const InfoTable = styled.table`
  width: 100%;
  color: #cacaca;
  border-radius: 7px;
  font-size: 12px;
  border-collapse: collapse;
  tr {
    :last-child {
      th,
      td {
        border-bottom: none;
      }
    }
    td {
      border-bottom: 1px solid ${tableBorderColor};
      padding: 4px;
    }
    th {
      border-bottom: 1px solid ${tableBorderColor};
      border-right: 1px solid ${tableBorderColor};
      :not(:first-child) {
        border-left: 2px solid ${tableBorderColor};
      }
    }
  }
`;
