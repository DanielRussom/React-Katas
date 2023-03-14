import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import StackExercise from "./StackExercise";

describe("Stack Exercise Feature", () => {

  it('has working push, pop, empty check, size, and peek functions', () => {
    render(<StackExercise />);
    let emptyCheckResult: HTMLElement | null = screen.getByText("The stack is empty");
    expect(emptyCheckResult).toBeInTheDocument();

    // Push two values
    let newValueInputBox = screen.getByPlaceholderText("New value");
    const firstValue = "First value"
    userEvent.type(newValueInputBox, firstValue);

    let pushButton = screen.getByRole('button', { name: 'Push' });
    userEvent.click(pushButton);

    const secondValue = "Second value"
    userEvent.type(newValueInputBox, secondValue);
    userEvent.click(pushButton);

    // Do we need to re-set this value? Probably... 
    emptyCheckResult = screen.queryByText("The stack is empty");
    expect(emptyCheckResult).not.toBeInTheDocument();

    // Size is 2 check
    let sizeResult = screen.getByText("Size: 2");
    expect(sizeResult).toBeInTheDocument();

    // Peek value
    let peekButton = screen.getByRole('button', { name: 'Peek' });
    userEvent.click(peekButton);

    let peekValueResult = screen.getByText(`The top of the stack is: ${secondValue}`);
    expect(peekValueResult).toBeInTheDocument();

    // Pop a value
    let popButton = screen.getByRole('button', { name: 'Pop' });
    userEvent.click(popButton);

    // Size is 1
    sizeResult = screen.getByText("Size: 1");
    expect(sizeResult).toBeInTheDocument();

    // Peek new top of stack
    userEvent.click(peekButton);

    peekValueResult = screen.getByText(`The top of the stack is: ${firstValue}`);
    expect(peekValueResult).toBeInTheDocument();

  });
});

describe("stack exercise", () => {
  function pushValue(value = "value") {
    var inputBox = screen.getByPlaceholderText("New value");
    userEvent.type(inputBox, value);
    let pushButton = screen.getByRole('button', { name: 'Push' });
    userEvent.click(pushButton);
  }

  it('contains a stack exercise title', () => {
    render(<StackExercise />);

    const title = screen.getByText("Stack:");

    expect(title).toBeInTheDocument();
  });

  describe("push functionality", () => {
    it('has a button', () => {
      render(<StackExercise />);

      var pushButton = screen.getByRole('button', { name: 'Push' });

      expect(pushButton).toBeInTheDocument();
    });

    it('has an input box', () => {
      render(<StackExercise />);

      var inputBox = screen.getByPlaceholderText("New value");

      expect(inputBox).toBeInTheDocument();
    });
  });

  describe("size display", () => {
    it('displays that the stack is empty', () => {
      render(<StackExercise />);

      var emptyStack = screen.getByText("The stack is empty");

      expect(emptyStack).toBeInTheDocument();
    });

    it('does not display that the stack is empty', () => {
      render(<StackExercise />);

      pushValue();

      var emptyStack = screen.queryByText("The stack is empty");
      expect(emptyStack).not.toBeInTheDocument();
    });

    it.each([
      [1],
      [2],
      [3]
    ])('displays that the size is 1', (expectedSize) => {
      render(<StackExercise />);

      for (let i = 0; i < expectedSize; i++) {
        pushValue();
      }

      var sizeDisplay = screen.getByText(`Size: ${expectedSize}`);
      expect(sizeDisplay).toBeInTheDocument();
    })
  });

  describe("peek functionality", () => {
    it("has a button", () => {
      render(<StackExercise />);

      var peekButton = screen.getByRole('button', { name: 'Peek' });

      expect(peekButton).toBeInTheDocument();
    });

    it("displays testValue", () => {
      render(<StackExercise />);
      
      pushValue("testValue");

      var peekButton = screen.getByRole('button', { name: 'Peek' });
      userEvent.click(peekButton);

      var peekedValue = screen.getByText(`The top of the stack is testValue`);
      expect(peekedValue).toBeInTheDocument();
    });
  });
});

