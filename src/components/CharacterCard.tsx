import React from 'react';
import styled from 'styled-components';

import { ISWCharacter } from '../types';

interface ICharacterCardProps {
  character: ISWCharacter;
  onNameClick(): void;
}
function CharacterCard({ character, onNameClick }: ICharacterCardProps) {
  return (
    <Card>
      <CharacterNameBtn nameLength={character.name.length} onClick={onNameClick}>
        {character.name}
      </CharacterNameBtn>
    </Card>
  );
}
export default CharacterCard;

const Card = styled.div`
  background-color: #101114;
  border: 1px solid #cacaca;
  border-radius: 18px;
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

  &:hover {
    background-color: #21242b;
  }
  &:active {
    background-color: #2a2e36;
  }
`;
