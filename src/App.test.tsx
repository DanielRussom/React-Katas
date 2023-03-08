import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import App from './App';

it('does not display content in the component container', () => {
  render(<App/>);

  const componentContainer = screen.queryByTestId("component-container");

  expect(componentContainer).toBeEmptyDOMElement()
});

it('contains a christmas tree generator button', () => {
  render(<App/>);

  const treeGeneratorButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });

  expect(treeGeneratorButton).toBeInTheDocument();
});

it('displays the treeGenerator', () => {
  render(<App/>);

  const treeGeneratorNavigationButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });
  userEvent.click(treeGeneratorNavigationButton);

  const generateTreeButton = screen.getByRole('button', { name: 'Generate Tree' });

  expect(generateTreeButton).toBeInTheDocument();
});

it('contains a stack exercise button', () => {
  render(<App/>);

  const stackExerciseButton = screen.getByRole('button', { name: 'Stack Exercise' });

  expect(stackExerciseButton).toBeInTheDocument();

});


