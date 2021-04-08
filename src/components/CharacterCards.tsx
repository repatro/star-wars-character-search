import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash/fp';

import { ISWCharacter } from '../types';
import ExpendableCharacterCard from './ExpendableCharacterCard';

interface ICharacterCardsProps {
  characters: Array<ISWCharacter>;
}
function CharacterCards({ characters }: ICharacterCardsProps) {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    setExpandedCardIndex(!isEmpty(characters) && characters.length < 3 ? 0 : null);
  }, [characters]);

  return (
    <CharacterCardsContainer>
      {characters.map((character, idx) => (
        <ExpendableCharacterCard
          key={idx}
          character={character}
          expanded={idx === expandedCardIndex}
          onNameClick={() => setExpandedCardIndex(idx === expandedCardIndex ? null : idx)}
        />
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
