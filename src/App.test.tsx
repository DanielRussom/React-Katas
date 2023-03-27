import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import App from './App';

jest.mock("./snake/Snake", () => () => {
  return <div data-testId="snake"/>
});

jest.mock("./stack-exercise/StackExercise", () => () => {
  return <div data-testId="stackExercise"/>
});

jest.mock("./tree-generator/TreeGenerator", () => () => {
  return <div data-testid="tree-generator"/>
});


describe("App", () => {

  const renderApp = () => render(<App />);

  const componentContainer = () => screen.queryByTestId("component-container");

  function getButton(buttonName : string) {
    return screen.getByRole('button', { name: buttonName });
  };

  it('does not display content in the component container', () => {
    renderApp();

    expect(componentContainer()).toBeEmptyDOMElement()
  });

  describe("tree generator", () => {
    it('contains a display button', () => {
      renderApp();

      const treeGeneratorButton = getButton('Christmas Tree Generator');

      expect(treeGeneratorButton).toBeInTheDocument();
    });

    it('is displayed', () => {
      renderApp();

      const treeGeneratorNavigationButton = getButton('Christmas Tree Generator');
      userEvent.click(treeGeneratorNavigationButton);

      const treeComponent = screen.getByTestId("tree-generator");
      expect(treeComponent).toBeInTheDocument();
    });
  })

  describe("stack exercise", () => {
    it('contains a display button', () => {
      renderApp();

      const stackExerciseButton = getButton('Stack Exercise');

      expect(stackExerciseButton).toBeInTheDocument();
    });

    it('is displayed', () => {
      renderApp();

      const stackExerciseButton = getButton('Stack Exercise');
      userEvent.click(stackExerciseButton);

      const stackComponent = screen.getByTestId("stackExercise");
      expect(stackComponent).toBeInTheDocument();
    });

    it("displays instead of tree generator", () => {
      renderApp();
      
      const treeGeneratorNavigationButton = getButton('Christmas Tree Generator');
      userEvent.click(treeGeneratorNavigationButton);

      const stackExerciseButton = getButton('Stack Exercise');
      userEvent.click(stackExerciseButton);
      
      const treeComponent = screen.queryByTestId("tree-generator");
      expect(treeComponent).toBeNull();

      const stackComponent = screen.getByTestId("stackExercise");
      expect(stackComponent).toBeInTheDocument();
    })
  });

  describe("snake", () => {
    it('contains a display button', () => {
      renderApp();

      const snakeButton = getButton('Snake');

      expect(snakeButton).toBeInTheDocument();
    });

    it('is displayed', () => {
      renderApp();

      const snakeButton = getButton('Snake');
      userEvent.click(snakeButton);

      const snakeComponent = screen.getByTestId("snake");
      expect(snakeComponent).toBeInTheDocument();
    });
  })
});


