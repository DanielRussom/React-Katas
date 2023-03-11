import { render, screen } from '@testing-library/react';
import * as React from 'react';
import StackExercise from "./StackExercise";

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
});