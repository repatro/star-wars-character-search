import React from 'react';
import { render } from '@testing-library/react';

import LoadingWrapper from '../LoadingWrapper';

describe('LoadingWrapper', () => {
  it('should show spinning indicator when loading', () => {
    const { rerender, queryByLabelText } = render(
      <LoadingWrapper>
        <ExampleComponent />
      </LoadingWrapper>
    );
    expect(queryByLabelText('loading indicator')).toBeNull();

    rerender(
      <LoadingWrapper isLoading>
        <ExampleComponent />
      </LoadingWrapper>
    );
    expect(queryByLabelText('loading indicator')).toBeVisible();
  });

  it('should show only error if there is one', () => {
    const { rerender, queryByRole, queryByText } = render(
      <LoadingWrapper>
        <ExampleComponent />
      </LoadingWrapper>
    );
    expect(queryByText('Some content')).toBeVisible();

    rerender(
      <LoadingWrapper error='An error message'>
        <ExampleComponent />
      </LoadingWrapper>
    );
    expect(queryByText('Some content')).toBeNull();
    expect(queryByText('An error message')).toBeVisible();
  });
});

function ExampleComponent() {
  return <div>Some content</div>;
}
