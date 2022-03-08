import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Calculator from './calculator';

xdescribe('Calculator', () => {
  test('Initial screen upon loaded, testing all buttons are there', () => {
    render(<Calculator />);
    //TODO: Need to figure out how to get the screen div
    const oneButton = screen.getByText(1);
    const twoButton = screen.getByText(2);
    const threeButton = screen.getByText(3);
    const fourButton = screen.getByText(4);
    const fiveButton = screen.getByText(5);
    const sixButton = screen.getByText(6);
    const sevenButton = screen.getByText(7);
    const eightButton = screen.getByText(8);
    const nineButton = screen.getByText(9);
    const plusButton = screen.getByText('+');
    const minusButton = screen.getByText('-');
    const multiplyButton = screen.getByText('*');
    const divideButton = screen.getByText('/');
    const equalButton = screen.getByText('=');

    expect(oneButton).toBeInTheDocument();
    expect(twoButton).toBeInTheDocument();
    expect(threeButton).toBeInTheDocument();
    expect(fourButton).toBeInTheDocument();
    expect(fiveButton).toBeInTheDocument();
    expect(sixButton).toBeInTheDocument();
    expect(sevenButton).toBeInTheDocument();
    expect(eightButton).toBeInTheDocument();
    expect(nineButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
    expect(minusButton).toBeInTheDocument();
    expect(multiplyButton).toBeInTheDocument();
    expect(divideButton).toBeInTheDocument();
    expect(equalButton).toBeInTheDocument();
  });
});
