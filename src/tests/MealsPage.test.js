import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const searchIcon = 'search-top-btn';
describe('Recipe in Progress', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('if meal is rendering', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals/52771/in-progress');

    expect(screen.getByText('Recipe in Progress')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByText(/arrabia/i)).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  });

  test('if meal is rendering', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks/178319/in-progress');

    expect(screen.getByText('Recipe in Progress')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByText(/arrabia/i)).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByText(/Alcoholic/i)).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  });
});
