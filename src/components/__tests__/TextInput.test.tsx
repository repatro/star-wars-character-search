import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Search } from '@styled-icons/bootstrap';

import TextInput from '../TextInput';

describe('TextInput', () => {
  it('should also focus when clicked outside of input', () => {
    const { container } = render(<TextInput icon={Search} onChange={() => {}} />);

    const input = container.querySelector('input');
    const icon = container.querySelector('svg');
    icon && fireEvent.click(icon);

    expect(input).toHaveFocus();
  });

  it('should be controlled when given value', () => {
    const { container, rerender } = render(<TextInput value='Some value' onChange={() => {}} />);

    expect(container.querySelector('input')?.value).toBe('Some value');

    rerender(<TextInput value='Some value 2' onChange={() => {}} />);
    expect(container.querySelector('input')?.value).toBe('Some value 2');
  });

  it('should autofocus', () => {
    const { container } = render(<TextInput autofocused onChange={() => {}} />);
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should debounce onChange call', async () => {
    const onChangeMock = jest.fn();
    const { findByText, container } = render(<TextInput debounceTime={50} onChange={onChangeMock} />);

    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'Val' } });
      fireEvent.change(input, { target: { value: 'Value' } });
    }

    await waitFor(() => expect(onChangeMock).toHaveBeenCalledWith('Value'), { timeout: 100 });
    expect(onChangeMock).toBeCalledTimes(1);
    expect(findByText('Value')).toBeTruthy();
  });

  it('shouldnt debounce if controlled', () => {
    const onChangeMock = jest.fn();
    const { findByText, container } = render(<TextInput value='V' debounceTime={5} onChange={onChangeMock} />);

    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'Val' } });
      fireEvent.change(input, { target: { value: 'Value' } });
    }

    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith('Value');
    expect(findByText('Value')).toBeTruthy();
  });
});
