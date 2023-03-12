import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import StackExercise from "./StackExercise";

describe("Acceptance test", () => {

  it('has working push, pop, empty check, size, and peek functions', () => {
    render(<StackExercise />);

    // Empty check
    let emptyCheckResult = screen.getByText("The stack is empty");
    expect(emptyCheckResult).toBeInTheDocument();

    // Push two values
    let newValueInputBox = screen.getByPlaceholderText("New value");
    
    userEvent.type(newValueInputBox, "First value");

    let pushButton = screen.getByRole('button', { name: 'Push' });
    userEvent.click(pushButton);
    
    userEvent.type(newValueInputBox, "Second value");
    userEvent.click(pushButton);

    // Do we need to re-set this value? Probably... 
    // emptyCheckResult = screen.getByText("The stack is empty");
    expect(emptyCheckResult).not.toBeInTheDocument();

    // Size is 2 check
    let sizeResult = screen.getByText("Size: 2");
    expect(sizeResult).toBeInTheDocument();

    // Peek value
    let peekButton = screen.getByRole('button', { name: 'Peek' });
    userEvent.click(peekButton);

    let peekValueResult = screen.getByText("The top of the stack is: Second value");
    expect(peekValueResult).toBeInTheDocument();

    // Pop a value
    let popButton = screen.getByRole('button', { name: 'Pop' });
    userEvent.click(popButton);

    // Size is 1
    sizeResult = screen.getByText("Size: 1");
    expect(sizeResult).toBeInTheDocument();

    // Peek new top of stack
    userEvent.click(peekButton);
    
    peekValueResult = screen.getByText("The top of the stack is: First value");
    expect(peekValueResult).toBeInTheDocument();

  });
});

describe("stack exercise", () => {
    it('contains a stack exercise title', () => {
      render(<StackExercise />);
    
      const title = screen.getByText("Stack:");
    
      expect(title).toBeInTheDocument();
    });

    it('contains a push button', () => {
      render(<StackExercise />);
    
      var pushButton = screen.getByRole('button', { name: 'Push' });
    
      expect(pushButton).toBeInTheDocument();
    });

    it('contains a push input box', () => {
      render(<StackExercise />);
    
      var inputBox = screen.getByPlaceholderText("New value");
    
      expect(inputBox).toBeInTheDocument();
    });
});