import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import App from './App';


describe("App", () => {

  it('does not display content in the component container', () => {
    render(<App />);

    const componentContainer = screen.queryByTestId("component-container");

    expect(componentContainer).toBeEmptyDOMElement()
  });

  describe("tree generator", () => {
    it('contains a display button', () => {
      render(<App />);

      const treeGeneratorButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });

      expect(treeGeneratorButton).toBeInTheDocument();
    });

    it('is displayed', () => {
      render(<App />);

      const treeGeneratorNavigationButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });
      userEvent.click(treeGeneratorNavigationButton);

      const generateTreeButton = screen.getByRole('button', { name: 'Generate Tree' });

      expect(generateTreeButton).toBeInTheDocument();
    });

    it('is hidden', () => {
      render(<App />);

      const treeGeneratorNavigationButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });
      userEvent.click(treeGeneratorNavigationButton);
      userEvent.click(treeGeneratorNavigationButton);

      const componentContainer = screen.queryByTestId("component-container");

      expect(componentContainer).toBeEmptyDOMElement()
    });
  })

  describe("stack exercise", () => {
    it('contains a display button', () => {
      render(<App />);

      const stackExerciseButton = screen.getByRole('button', { name: 'Stack Exercise' });

      expect(stackExerciseButton).toBeInTheDocument();
    });

    it('is displayed', () => {
      render(<App />);

      const stackExerciseButton = screen.getByRole('button', { name: 'Stack Exercise' });
      userEvent.click(stackExerciseButton);

      const stackTitle = screen.getByText("Stack:");

      expect(stackTitle).toBeInTheDocument();
    });
  });
});

