import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import favoriteRecipes from './Mocks/data/doneRecipes';

const url = '/favorite-recipes';

describe('', () => {
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

    const h0Img = screen.getByTestId('0-horizontal-image');
    const h0topText = screen.getByTestId('0-horizontal-top-text');
    const h0name = screen.getByTestId('0-horizontal-name');
    const h0shareBtn = screen.getByTestId('0-horizontal-share-btn');

    const h1Img = screen.getByTestId('1-horizontal-image');
    const h1topText = screen.getByTestId('1-horizontal-top-text');
    const h1name = screen.getByTestId('1-horizontal-name');
    const h1shareBtn = screen.getByTestId('1-horizontal-share-btn');

    expect(h0Img).toBeInTheDocument();
    expect(h0topText).toBeInTheDocument();
    expect(h0name).toBeInTheDocument();
    expect(h0shareBtn).toBeInTheDocument();
    expect(h1Img).toBeInTheDocument();
    expect(h1topText).toBeInTheDocument();
    expect(h1name).toBeInTheDocument();
    expect(h1shareBtn).toBeInTheDocument();
  });
  test('verify if the copy button is working', () => {
    renderWithRouter(<App />, [url]);

    const shareBtnEl = screen.getAllByAltText(/^share$/i);
    expect(shareBtnEl).toHaveLength(3);

    userEvent.click(shareBtnEl[0]);

    const copyTextEl = screen.getAllByText(/^Link copied!$/i);
    expect(copyTextEl).toHaveLength(1);
  });
  test('verify if the filters buttons are working properly', () => {
    renderWithRouter(<App />, [url]);

    const filterFoodBtn = screen.getByTestId('filter-by-food-btn');
    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    const filterAllBtn = screen.getByTestId('filter-by-all-btn');

    let cardDoneEl = screen.getAllByTestId(/-horizontal-image/i);
    expect(cardDoneEl).toHaveLength(3);

    userEvent.click(filterFoodBtn);
    cardDoneEl = screen.getAllByTestId(/-horizontal-image/i);
    expect(cardDoneEl).toHaveLength(2);
    userEvent.click(filterDrinkBtn);
    cardDoneEl = screen.getAllByTestId(/-horizontal-image/i);
    expect(cardDoneEl).toHaveLength(1);
    userEvent.click(filterAllBtn);
    cardDoneEl = screen.getAllByTestId(/-horizontal-image/i);
    expect(cardDoneEl).toHaveLength(3);
  });
  test('verify if the copy button is working', () => {
    renderWithRouter(<App />, [url]);

    let favoriteBtnEl = screen.getAllByAltText(/^favorite$/i);
    expect(favoriteBtnEl).toHaveLength(3);

    userEvent.click(favoriteBtnEl[0]);
    favoriteBtnEl = screen.getAllByAltText(/^favorite$/i);
    expect(favoriteBtnEl).toHaveLength(2);
  });
  test('', () => {
    localStorage.clear();
    renderWithRouter(<App />, [url]);

    const pageTitleEl = screen.getByRole('heading', { name: /favorite recipes/i, level: 1 });
    const filterFoodBtn = screen.getByTestId('filter-by-food-btn');
    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    const filterAllBtn = screen.getByTestId('filter-by-all-btn');

    expect(pageTitleEl).toBeInTheDocument();
    expect(filterFoodBtn).toBeInTheDocument();
    expect(filterDrinkBtn).toBeInTheDocument();
    expect(filterAllBtn).toBeInTheDocument();
  });
});
