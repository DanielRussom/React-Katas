import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import StackExercise from "./StackExercise";
import { getButton } from "../../testExtensions/screenTestExtensions";

describe("Stack Exercise Feature", () => {

  it('has working push, pop, empty check, size, and peek functions', () => {
    render(<StackExercise />);
    let emptyCheckResult: HTMLElement | null = screen.getByText("The stack is empty");
    expect(emptyCheckResult).toBeInTheDocument();

    // Push two values
    let newValueInputBox = screen.getByPlaceholderText("New value");
    const firstValue = "First value"
    userEvent.type(newValueInputBox, firstValue);

    let pushButton = getButton("Push");
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
    let peekValueResult = screen.getByText(`The top of the stack is: ${secondValue}`);
    expect(peekValueResult).toBeInTheDocument();

    // Pop a value
    let popButton = getButton('Pop');
    userEvent.click(popButton);

    // Size is 1
    sizeResult = screen.getByText("Size: 1");
    expect(sizeResult).toBeInTheDocument();

    // Peek new top of stack
    peekValueResult = screen.getByText(`The top of the stack is: ${firstValue}`);
    expect(peekValueResult).toBeInTheDocument();

  });
});

describe("stack exercise", () => {

  function pushValue(value = "value") {
    var inputBox = screen.getByPlaceholderText("New value");
    userEvent.type(inputBox, value);
    let pushButton = getButton("Push");
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

      let pushButton = getButton("Push");

      expect(pushButton).toBeInTheDocument();
    });

    it('has an input box', () => {
      render(<StackExercise />);

      var inputBox = screen.getByPlaceholderText("New value");

      expect(inputBox).toBeInTheDocument();
    });

    it('not accept an empty string', () => {
      render(<StackExercise />);

      userEvent.click(getButton("Push"));

      var emptyStack = screen.queryByText("The stack is empty");
      expect(emptyStack).toBeInTheDocument();

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
    it.each([
      ["testValue"],
      ["anotherValue"]
    ])
      ("displays top value", (expectedValue) => {
        render(<StackExercise />);

        pushValue(expectedValue);

        var peekedValue = screen.getByText(`The top of the stack is: ${expectedValue}`);
        expect(peekedValue).toBeInTheDocument();
      });

    it("displays top value after two pushes", () => {
      render(<StackExercise />);

      pushValue("firstValue");
      pushValue("secondValue");

      var peekedValue = screen.getByText(`The top of the stack is: secondValue`);
      expect(peekedValue).toBeInTheDocument();
    });

    it("doesn't display the top of the stack when empty", () => {
      render(<StackExercise />);

      var peekedValue = screen.queryByText(`The top of the stack is:`, { exact: false });

      expect(peekedValue).not.toBeInTheDocument();
    })
  });

  describe("pop functionality", () => {
    it('has a button', () => {
      render(<StackExercise />);

      let popButton = getButton('Pop');

      expect(popButton).toBeInTheDocument();
    });

    it('removes the top of the stack', () => {
      render(<StackExercise />);

      pushValue("firstValue");
      pushValue("secondValue");

      let popButton = getButton('Pop');
      userEvent.click(popButton);
      
      var peekedValue = screen.getByText(`The top of the stack is: firstValue`);
      expect(peekedValue).toBeInTheDocument();
    })

    it('updates the size correctly after popping', () => {
      render(<StackExercise />);

      pushValue("firstValue");
      pushValue("secondValue");

      let popButton = getButton('Pop');
      userEvent.click(popButton);
      
      var sizeDisplay = screen.getByText(`Size: 1`);
      expect(sizeDisplay).toBeInTheDocument();
    })
  });

});

