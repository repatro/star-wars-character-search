import React from 'react';
import { render } from '@testing-library/react';

import CharacterCards from '../CharacterCards';
import { swCharactersExample } from '../../__mocks__/dataExamples';

describe('CharacterCards', () => {
  it('should auto expand first card only if there are less than 3 cards', () => {
    const { getByText, rerender } = render(<CharacterCards characters={swCharactersExample} />);

    expect(getByText('Char Name 1').nextSibling).not.toHaveAttribute('data-expanded', 'true');

    rerender(<CharacterCards characters={swCharactersExample.slice(0, 2)} />);
    expect(getByText('Char Name 1').nextSibling).toHaveAttribute('data-expanded', 'true');
  });
});
