import React from 'react';
import styled from 'styled-components';
import { Search } from '@styled-icons/bootstrap';

import TextInput from './components/TextInput';

function App() {
  return (
    <div>
      <HeaderSection>
        <NarrowCentered>
          <TextInput autofocused placeholder='Search...' icon={Search} fluid debounceTime={400} onChange={() => {}} />
        </NarrowCentered>
      </HeaderSection>
      <Title>STAR WARS CHARACTER SEARCH</Title>
    </div>
  );
}

const Title = styled.h2`
  color: #000000;
  text-align: center;
  text-shadow: 1px 1px 0 #ebe70e, -1px -1px 0 #ebe70e, 1px -1px 0 #ebe70e, -1px 1px 0 #ebe70e, 1px 1px 0 #ebe70e;
`;

const NarrowCentered = styled.div`
  max-width: 500px;
  width: 90%;
  padding: 25px;
  display: flex;
  align-items: center;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: center;
  background-color: #111111;
  box-shadow: 0 0 3pt 0.5pt #949492;
  height: 100px;
`;

export default App;
