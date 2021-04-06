import React from 'react';
import styled from 'styled-components';

import { ISWCharacter } from '../types';
import CharacterInfoTable from './CharacterInfoTable';

interface IExpendableCharacterCardProps {
  character: ISWCharacter;
  expanded?: boolean;
  onNameClick(): void;
}
function ExpendableCharacterCard({ character, expanded, onNameClick }: IExpendableCharacterCardProps) {
  return (
    <Card>
      <CharacterNameBtn nameLength={character.name.length} onClick={onNameClick}>
        {character.name}
      </CharacterNameBtn>
      <ExpandedInfoContainer expanded={expanded} data-expanded={expanded}>
        <CharacterInfoTable character={character} />
      </ExpandedInfoContainer>
    </Card>
  );
}
export default ExpendableCharacterCard;

const Card = styled.div`
  background-color: #101114;
  border: 1px solid #cacaca;
  border-radius: 18px;
  overflow: hidden;
  min-height: 50px;
`;

interface ICharacterNameBtnProps {
  nameLength: number;
}
const CharacterNameBtn = styled.button<ICharacterNameBtnProps>`
  width: 100%;
  cursor: pointer;
  color: #e5e5e5;
  font-size: ${(props) => (props.nameLength < 20 ? '18px' : '15px')};
  padding: 10px;
  height: 50px;
  border: none;
  border-bottom: 1px solid #cacaca;
  border-radius: 18px;
  background-color: #181a1f;
  z-index: 100;

  &:hover {
    background-color: #21242b;
  }
  &:active {
    background-color: #2a2e36;
  }
`;

interface IExpandedInfoContainerProps {
  expanded?: boolean;
}
const ExpandedInfoContainer = styled.div<IExpandedInfoContainerProps>`
  max-height: ${(props) => (props.expanded ? '200px' : 0)};

  overflow: hidden;
  transition: max-height 0.2s linear;
`;
