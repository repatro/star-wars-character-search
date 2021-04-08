import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Search } from '@styled-icons/bootstrap';

import TextInput from './components/TextInput';
import CharacterCards from './components/CharacterCards';
import { getSWCharacters } from './API';
import { IFetchedList, ISWCharacter } from './types';
import LoadingWrapper from './components/LoadingWrapper';

function App() {
  const [charactersData, setCharactersData] = useState<IFetchedList<ISWCharacter>>({
    list: [],
    isLoading: false
  });

  useEffect(() => {
    fetchCharacters();
  }, []);

  function fetchCharacters(search?: string) {
    charactersData.abortLoading?.();
    const { getData, abort } = getSWCharacters(search?.trim().toLowerCase());
    setCharactersData({ ...charactersData, isLoading: true, abortLoading: abort });
    getData()
      .then((list) => setCharactersData({ list, isLoading: false }))
      .catch(
        (e) => e.name !== 'AbortError' && setCharactersData({ ...charactersData, isLoading: false, error: e.message })
      );
  }

  return (
    <div>
      <HeaderSection>
        <NarrowCenteredHeader>
          <TextInput
            autofocused
            placeholder='Search...'
            icon={Search}
            fluid
            debounceTime={400}
            onChange={fetchCharacters}
          />
        </NarrowCenteredHeader>
      </HeaderSection>
      <Title>STAR WARS CHARACTER SEARCH</Title>
      <NarrowCenteredContent>
        <LoadingWrapper
          isLoading={charactersData.isLoading}
          loadingHeight={200}
          spinningIndicatorSize={50}
          error={charactersData.error && 'Error fetching characters'}
        >
          <CharacterCards characters={charactersData.list} />
        </LoadingWrapper>
      </NarrowCenteredContent>
    </div>
  );
}

const Title = styled.h2`
  color: #000000;
  text-align: center;
  text-shadow: 1px 1px 0 #ebe70e, -1px -1px 0 #ebe70e, 1px -1px 0 #ebe70e, -1px 1px 0 #ebe70e, 1px 1px 0 #ebe70e;
`;

const NarrowCenteredHeader = styled.div`
  max-width: 500px;
  width: 90%;
  padding: 25px;
  display: flex;
  align-items: center;
`;

const NarrowCenteredContent = styled.div`
  max-width: 800px;
  width: 90%;
  margin: auto;
  padding: 25px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: center;
  background-color: #111111;
  box-shadow: 0 0 3pt 0.5pt #949492;
  height: 100px;
`;

export default App;
