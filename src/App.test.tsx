import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import App from './App';

it('contains a tree size input box', () => {
  render(<App />);

  const inputBox = screen.getByLabelText("Tree Size:");

  expect(inputBox).toBeInTheDocument();
});

it('contains a generate tree button', () => {
  render(<App />);

  const button = screen.getByText("Generate Tree");

  expect(button).toBeInTheDocument();
});

it('displays a single line tree', () => {
  render(<App />);

  fireEvent.click(screen.getByText("Generate Tree"));
  const treeDisplay = screen.getByText("|");

  expect(treeDisplay).toBeInTheDocument();
});