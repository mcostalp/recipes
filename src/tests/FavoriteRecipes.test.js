import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const url = '/favorite-recipes';

describe('', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });
  afterEach(() => {
    localStorage.clear();
  });
  test('verify if the favorite recipes elements appears', () => {
    renderWithRouter(<App />, [url]);

    const firstImage = screen.getByTestId('0-horizontal-image');
    const secondImage = screen.getByTestId('1-horizontal-image');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();

    expect(firstImage).toBeInTheDocument();
    expect(firstImage).toHaveProperty('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');

    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();

    expect(secondImage).toBeInTheDocument();
    expect(secondImage).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');

    expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();

    userEvent.click(mealBtn);
    expect(screen.getByText(/arrabia/i)).toBeInTheDocument();
    userEvent.click(drinkBtn);
    expect(screen.getByText(/aquam/i)).toBeInTheDocument();
  });
});
