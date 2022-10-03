import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Recipe in progress', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('if meals in progress is rendering properly', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals/52771/in-progress');

    expect(screen.getByText(/Recipe in Progress/i)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-step')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  });

  test('if drinks in progress is rendering properly', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks/178319/in-progress');

    expect(screen.getByText(/Recipe in Progress/i)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-step')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  });
});
