import React from 'react';
import styled from 'styled-components';

import { ISWCharacter } from '../types';
import CharacterCard from './CharacterCard';

interface ICharacterCardsProps {
  characters: Array<ISWCharacter>;
}
function CharacterCards({ characters }: ICharacterCardsProps) {
  return (
    <CharacterCardsContainer>
      {characters.map((character, idx) => (
        <CharacterCard key={idx} character={character} onNameClick={() => {}} />
      ))}
    </CharacterCardsContainer>
  );
}

const CharacterCardsContainer = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  > * {
    margin-bottom: 20px;
    flex-basis: 95%;
    @media (min-width: 600px) {
      flex-basis: 45%;
    }
  }
`;

export default CharacterCards;
