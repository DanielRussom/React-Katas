import { render, screen } from '@testing-library/react';
import * as React from 'react';
import App from './App';

it('contains a christmas tree generator button', () => {
  render(<App/>);

  const treeGeneratorButton = screen.getByRole('button', { name: 'Christmas Tree Generator' });

  expect(treeGeneratorButton).toBeInTheDocument();
});

it('does not display treeGenerator by default', () => {
  render(<App/>);

  const componentContainer = screen.queryByTestId("component-container");

  expect(componentContainer).toBeEmptyDOMElement()
});
