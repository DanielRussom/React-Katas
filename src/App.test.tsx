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

it('does not display tree stump before clicking button', () => {
  render(<App />);

  const treeDisplay = screen.queryByText("|");

  expect(treeDisplay).toBeNull();
});

it('displays a tree stump after clicking button', () => {
  render(<App />);

  fireEvent.click(screen.getByText("Generate Tree"));
  const treeDisplay = screen.getByText("|");

  expect(treeDisplay).toBeInTheDocument();
});