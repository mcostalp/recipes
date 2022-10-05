import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import gigaMock from './Mocks/fetchMock';

const url = '/foods/52771';
const url2 = '/drinks/178319';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('testing recipe details', () => {
  beforeEach(() => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email: '' }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('verify if the start recipe button is working propperly', async () => {
    gigaMock('themeal', '52771');
    const { history } = renderWithRouter(<App />, [url]);

    const titileEl = await screen.findByRole('heading', {
      name: /Spicy Arrabiata Penne/i, level: 1,
    });
    const imgEl = await screen.findByTestId('recipe-photo');
    const categEl = await screen.findByTestId('recipe-category');
    const ingredAndMeasureEl = await screen.findAllByTestId(/ingredient-name-and-measure/i);
    const videoEl = screen.getByTitle(/youtube video player/i);

    expect(imgEl).toHaveAttribute('alt', 'Spicy Arrabiata Penne');
    expect(videoEl).toBeInTheDocument();
    expect(titileEl).toBeInTheDocument();
    expect(imgEl).toBeInTheDocument();
    expect(categEl).toBeInTheDocument();
    expect(ingredAndMeasureEl.length).toBe(8);

    const recomendationsEls = await screen.findAllByTestId(/recomendation-card/i);
    const recomendationsTitleEl = await screen.findAllByTestId(/recomendation-title/i);

    expect(recomendationsEls.length).toBe(6);
    expect(recomendationsTitleEl.length).toBe(6);

    const startRecipeBtn = await screen.findByRole('button', {
      name: /start recipe/i,
    });
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/foods/52771/in-progress');
  });
  test('', async () => {
    gigaMock('thecocktail', '178319');
    const { history } = renderWithRouter(<App />, [url2]);

    const recipeCateg = await screen.findByText(/alcoholic/i);
    const ingredAndMeasureEl = await screen.findAllByTestId(/ingredient-name-and-measure/i);
    const videoEl = screen.queryByTitle(/youtube video player/i);

    expect(videoEl).not.toBeInTheDocument();
    expect(ingredAndMeasureEl.length).toBe(3);
    expect(recipeCateg).toBeInTheDocument();

    const recomendationsEls = await screen.findAllByTestId(/recomendation-card/i);
    const recomendationsTitleEl = await screen.findAllByTestId(/recomendation-title/i);

    expect(recomendationsEls.length).toBe(6);
    expect(recomendationsTitleEl.length).toBe(6);

    const startRecipeBtn = await screen.findByRole('button', {
      name: /start recipe/i,
    });
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
  test('verify if the start/continue recipe button doesnt appear in /foods after youve done the recipe', () => {
    gigaMock('themeal', '52771');
    const newRecipesFinish = [{
      id: '52771',
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(newRecipesFinish));
    renderWithRouter(<App />, [url]);

    const startRecipeBtn = screen.queryByRole('button', {
      name: /start recipe/i,
    });
    const continueRecipeBtn = screen.queryByRole('button', { name: /Continue Recipe/i });

    expect(continueRecipeBtn).not.toBeInTheDocument();
    expect(startRecipeBtn).not.toBeInTheDocument();
  });
  test('verify if the continue recipe button appear after youve started a recipe', () => {
    gigaMock('thecocktail', '178319');
    global.localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { 178319: [] }, meals: {} }));
    renderWithRouter(<App />, [url2]);

    const continueRecipeBtn = screen.getByRole('button', { name: /Continue Recipe/i });

    expect(continueRecipeBtn).toBeInTheDocument();
  });
  test('verify if the share button is working', async () => {
    gigaMock('thecocktail', '178319');
    renderWithRouter(<App />, [url2]);
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    const shareBtn = await screen.findByRole('button', {
      name: /share/i,
    });

    expect(shareBtn).toBeInTheDocument();

    userEvent.click(shareBtn);
  });
  test('verify is favorite button is working', async () => {
    gigaMock('thecocktail', '178319');
    renderWithRouter(<App />, ['/drinks/178319']);

    const favBtn = await screen.findByTestId('favorite-btn');

    expect(favBtn).toBeInTheDocument();

    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
  test('verify if the favorite icon appears as favorited', async () => {
    gigaMock('themeal', '52771');
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '52771' }]));
    renderWithRouter(<App />, [url]);

    const favBtn = await screen.findByTestId('favorite-btn');

    expect(favBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});
