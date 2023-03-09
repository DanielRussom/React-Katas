import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import App from './App';

describe("App", () => {
  const renderApp = () => render(<App />);

  const componentContainer = () => screen.queryByTestId("component-container");

  it('does not display content in the component container', () => {
    renderApp();

    expect(componentContainer()).toBeEmptyDOMElement()
  });

  describe("tree generator", () => {
    it('contains a display button', () => {
      renderApp();

      const treeGeneratorButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });

      expect(treeGeneratorButton).toBeInTheDocument();
    });

    it('is displayed', () => {
      renderApp();

      const treeGeneratorNavigationButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });
      userEvent.click(treeGeneratorNavigationButton);

      const generateTreeButton = screen.getByRole('button', { name: 'Generate Tree' });

      expect(generateTreeButton).toBeInTheDocument();
    });

    it('is hidden', () => {
      renderApp();

      const treeGeneratorNavigationButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });
      userEvent.click(treeGeneratorNavigationButton);
      userEvent.click(treeGeneratorNavigationButton);

      expect(componentContainer()).toBeEmptyDOMElement()
    });
  })

  describe("stack exercise", () => {
    it('contains a display button', () => {
      renderApp();

      const stackExerciseButton = screen.getByRole('button', { name: 'Stack Exercise' });

      expect(stackExerciseButton).toBeInTheDocument();
    });

    it('is displayed', () => {
      renderApp();

      const stackExerciseButton = screen.getByRole('button', { name: 'Stack Exercise' });
      userEvent.click(stackExerciseButton);

      const stackTitle = screen.getByText("Stack:");

      expect(stackTitle).toBeInTheDocument();
    });

    it('is hidden', () => {
      renderApp();

      const stackExerciseButton = screen.getByRole('button', { name: 'Stack Exercise' });
      userEvent.click(stackExerciseButton);
      userEvent.click(stackExerciseButton);

      expect(componentContainer()).toBeEmptyDOMElement()
    });
  });
});


