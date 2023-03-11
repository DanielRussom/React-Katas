import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import StackExercise from "./StackExercise";

describe("Acceptance test", () => {

  it('has working push, pop, empty check, size, and peek functions', () => {
    render(<StackExercise />);

    let emptyCheckResult = screen.queryByText("The stack is empty");
    expect(emptyCheckResult).toBeNull();

    const emptyCheckButton = screen.getByRole('button', { name: 'Empty Check' });
    userEvent.click(emptyCheckButton);
    emptyCheckResult = screen.getByText("The stack is empty");
    expect(emptyCheckResult).toBeInTheDocument();

    // Run size == 0
    
    // Peek value

    //Push two values

    // Run empty check test

    // Expect size == 2

    // Peek value

    // Pop a value

    // Peek new value

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