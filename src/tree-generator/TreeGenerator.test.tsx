import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from "react";
import { clickButton } from '../../testExtensions/screenTestExtensions';
import TreeGenerator from "./TreeGenerator";

describe("christmas tree", () => {

  function clickGenerateTreeButton() {
    clickButton("Generate Tree");
  }
  
  function getTreeDisplay() {
    return screen.getByRole("paragraph");
  }
  
  it('contains a tree size input box', () => {
    render(<TreeGenerator />);

    const inputBox = screen.getByLabelText("Tree Size:");

    expect(inputBox).toBeInTheDocument();
  });

  it('does not display tree stump before clicking button', () => {
    render(<TreeGenerator />);

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
      render(<TreeGenerator />);

      const inputBox = screen.getByLabelText("Tree Size:");
      userEvent.type(inputBox, input);
      clickGenerateTreeButton();

      const treeDisplay = getTreeDisplay();
      expect(treeDisplay.textContent).toEqual(expected)
    });

  it('splits tree display into multiple lines', () => {
    render(<TreeGenerator />);

    clickGenerateTreeButton();

    const treeDisplay = getTreeDisplay();
    expect(treeDisplay).toHaveStyle("white-space: pre-line");
  });
})
