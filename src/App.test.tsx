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

  const treeDisplay = getTreeDisplay();

  expect(treeDisplay.textContent).toEqual("")
});

it.each([
  ["0", "|"],
  ["1", "X\n|"],
  ["2", "X\nXXX\n|"],
  ["3", "X\nXXX\nXXXXX\n|"],
])
('displays expected tree based on tree size', (input, expected) => {
  render(<App />);

  const inputBox = screen.getByLabelText("Tree Size:");
  userEvent.type(inputBox, input);
  fireEvent.click(screen.getByText("Generate Tree"));
  
  const treeDisplay = getTreeDisplay();
  expect(treeDisplay.textContent).toEqual(expected)
});

it('splits tree display into multiple lines', () => {
  render(<App />);

  fireEvent.click(screen.getByText("Generate Tree"));
  
  const treeDisplay = getTreeDisplay();
  expect(treeDisplay).toHaveStyle("white-space: pre-line");
});

function getTreeDisplay() {
  return screen.getByRole("paragraph");
}
