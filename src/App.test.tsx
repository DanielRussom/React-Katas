import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import App from './App';

it('contains a christmas tree generator button', () => {
  render(<App/>);

  const treeGeneratorButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });

  expect(treeGeneratorButton).toBeInTheDocument();
});