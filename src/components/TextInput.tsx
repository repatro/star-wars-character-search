import React, { useRef, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { debounce, isUndefined } from 'lodash/fp';
import { StyledIcon } from '@styled-icons/styled-icon';

interface ITextInputProps {
  value?: string;
  onChange(value: string): void;
  placeholder?: string;
  icon?: StyledIcon;
  fluid?: boolean;
  fontSize?: number;
  debounceTime?: number;
  autofocused?: boolean;
}
function TextInput({
  value,
  onChange,
  placeholder,
  icon: Icon,
  fluid,
  fontSize = 16,
  debounceTime,
  autofocused
}: ITextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currValue, setCurrValue] = useState('');

  useEffect(() => {
    autofocused && handleFocusInput();
  }, []);

  function handleChange({ currentTarget: { value: newValue } }: React.FormEvent<HTMLInputElement>) {
    if (isUndefined(value)) {
      setCurrValue(newValue);
      if (debounceTime) {
        debouncedOnChange(newValue);
      }
    } else {
      onChange(newValue);
    }
  }

  function handleFocusInput() {
    inputRef.current?.focus();
  }

  const debouncedOnChange = useMemo(() => debounce(debounceTime || 0, onChange), [debounceTime, onChange]);

  return (
    <TextInputContainer fluid={fluid} onClick={handleFocusInput}>
      {Icon && <Icon size={fontSize} />}
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={isUndefined(value) ? currValue : value}
        onChange={handleChange}
        fontSize={fontSize}
      />
    </TextInputContainer>
  );
}

interface ITextInputContainerProps {
  fluid?: boolean;
}
const TextInputContainer = styled.div<ITextInputContainerProps>`
  display: flex;
  align-items: center;
  background-color: #010101;
  color: #dadada;
  border: 1px solid #949492;
  border-radius: 8px;
  width: ${(props) => (props.fluid ? '100%' : '320px')};
  padding: 10px;
  &:focus-within,
  &:active {
    box-shadow: 0 0 2pt 2pt #949492;
    outline: none;
  }
  cursor: text;
`;

interface IInputProps {
  fontSize: number;
}
const Input = styled.input<IInputProps>`
  flex-grow: 1;
  width: 100px;
  border: none;
  background-color: transparent;
  color: #dadada;
  padding-left: 10px;
  font-size: ${(props) => props.fontSize || 16}px;
  &:focus,
  &:active {
    outline: none;
  }
`;

export default TextInput;
