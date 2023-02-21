import { render, screen } from '@testing-library/react';
import * as React from 'react';
import App from './App';

it('contains an input box', () => {
  render(<App />);
  
  const inputBox = screen.getByLabelText("Tree Size:");

  expect(inputBox).toBeInTheDocument();
  }
);
