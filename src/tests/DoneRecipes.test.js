import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import doneRecipes from './Mocks/data/doneRecipes';

describe('testing done recipes page', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    renderWithRouter(<App />, ['/done-recipes']);
  });
  afterEach(() => {
    localStorage.clear();
  });
  test('verify if the base elements appears', async () => {
    const pageTitleEl = await screen.findByRole('heading', { name: /done recipes/i, level: 1 });
    const filterFoodBtn = await screen.findByTestId('filter-by-food-btn');
    const filterDrinkBtn = await screen.findByTestId('filter-by-drink-btn');
    const filterAllBtn = await screen.findByTestId('filter-by-all-btn');

    expect(pageTitleEl).toBeInTheDocument();
    expect(filterFoodBtn).toBeInTheDocument();
    expect(filterDrinkBtn).toBeInTheDocument();
    expect(filterAllBtn).toBeInTheDocument();
  });
  test('verify if the done recipes elements appears', async () => {
    const h0Img = await screen.findByTestId('0-horizontal-image');
    const h0topText = await screen.findByTestId('0-horizontal-top-text');
    const h0name = await screen.findByTestId('0-horizontal-name');
    const h0doneDate = await screen.findByTestId('0-horizontal-done-date');
    const h0shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    const h0tag1 = await screen.findByTestId('0-Streetfood-horizontal-tag');
    const h0tag2 = await screen.findByTestId('0-Onthego-horizontal-tag');

    const h1Img = await screen.findByTestId('1-horizontal-image');
    const h1topText = await screen.findByTestId('1-horizontal-top-text');
    const h1name = await screen.findByTestId('1-horizontal-name');
    const h1doneDate = await screen.findByTestId('1-horizontal-done-date');
    const h1shareBtn = await screen.findByTestId('1-horizontal-share-btn');

    expect(h0Img).toBeInTheDocument();
    expect(h0topText).toBeInTheDocument();
    expect(h0name).toBeInTheDocument();
    expect(h0doneDate).toBeInTheDocument();
    expect(h0shareBtn).toBeInTheDocument();
    expect(h0tag1).toBeInTheDocument();
    expect(h0tag2).toBeInTheDocument();
    expect(h1Img).toBeInTheDocument();
    expect(h1topText).toBeInTheDocument();
    expect(h1name).toBeInTheDocument();
    expect(h1doneDate).toBeInTheDocument();
    expect(h1shareBtn).toBeInTheDocument();
  });
  test('verify if the copy button is working', () => {
    const shareBtnEl = screen.getAllByAltText(/^share$/i);
    expect(shareBtnEl).toHaveLength(3);

    userEvent.click(shareBtnEl[0]);

    const copyTextEl = screen.getAllByText(/^Link copied!$/i);
    expect(copyTextEl).toHaveLength(1);
  });
  test('verify if the filters buttons are working properly', () => {
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
});
