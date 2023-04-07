import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { getButton } from '../testExtensions/screenTestExtensions';
import App from './App';

jest.mock("./snake/SnakeGame", () => () => {
  return <div data-testid="snake" />
});

jest.mock("./stack-exercise/StackExercise", () => () => {
  return <div data-testid="stackExercise" />
});

jest.mock("./tree-generator/TreeGenerator", () => () => {
  return <div data-testid="tree-generator" />
});


describe("App", () => {

  const renderApp = () => render(<App />);
  
  it('does not display content in the component container', () => {
    renderApp();

    expect(screen.queryByTestId("component-container")).toBeEmptyDOMElement()
  });

  it('tree generator is displayed', () => {
    renderApp();

    const treeGeneratorNavigationButton = getButton('Christmas Tree Generator');
    userEvent.click(treeGeneratorNavigationButton);

    const treeComponent = screen.getByTestId("tree-generator");
    expect(treeComponent).toBeInTheDocument();
  });

  it('stack exercise is displayed', () => {
    renderApp();

    const stackExerciseButton = getButton('Stack Exercise');
    userEvent.click(stackExerciseButton);

    const stackComponent = screen.getByTestId("stackExercise");
    expect(stackComponent).toBeInTheDocument();
  });

  it('snake is displayed', () => {
    renderApp();

    const snakeButton = getButton('Snake');
    userEvent.click(snakeButton);

    const snakeComponent = screen.getByTestId("snake");
    expect(snakeComponent).toBeInTheDocument();
  });

  it("displays stack exercise after tree generator", () => {
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


