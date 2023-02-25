import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  const treeDisplay = screen.getByRole("paragraph");

  expect(treeDisplay.textContent).toEqual("")
});

it('displays a tree stump after clicking button', () => {
  render(<App />);

  fireEvent.click(screen.getByText("Generate Tree"));
  
  const treeDisplay = screen.getByRole("paragraph");

  expect(treeDisplay.textContent).toEqual("|")
});

it('displays a tree with one X', () => {
  render(<App />);

  const inputBox = screen.getByLabelText("Tree Size:");

  userEvent.type(inputBox, '1');

  fireEvent.click(screen.getByText("Generate Tree"));
  const treeDisplay = screen.getByRole("paragraph");
  
  expect(treeDisplay.textContent).toEqual("X\n|")
});

it('splits tree display into multiple lines', () => {
  render(<App />);

  const inputBox = screen.getByLabelText("Tree Size:");

  userEvent.type(inputBox, '1');

  fireEvent.click(screen.getByText("Generate Tree"));
  const treeDisplay = screen.getByRole("paragraph");
  
  expect(treeDisplay).toHaveStyle("white-space: pre-line");
});
