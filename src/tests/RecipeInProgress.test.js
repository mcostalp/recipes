import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
// import gigaMock from './Mocks/fetchMock';

const whiteHeartIcon = 'whiteHeartIcon.svg';
const blackHeartIcon = 'blackHeartIcon.svg';
const url = '/drinks/178319/in-progress';

describe('testing the recipe in progress page', () => {
  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });
  test('verify if the foods in progress contains the expected elements', async () => {
    gigaMock('themeal', '52771');
    renderWithRouter(<App />, [url]);
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '21/07/2022 16:23:14',
      tags: [],
    }]));
    const { history } = renderWithRouter(<App />, ['/foods/52771/in-progress']);

    const ingred1 = await screen.findByRole('checkbox', {
      name: /penne rigate/i });
    const ingred2 = await screen.findByRole('checkbox', {
      name: /olive oil/i });
    const ingred3 = await screen.findByRole('checkbox', {
      name: /garlic/i });
    const ingred4 = await screen.findByRole('checkbox', {
      name: /chopped tomatoes/i });
    const ingred5 = await screen.findByRole('checkbox', {
      name: /red chile flakes/i });
    const ingred6 = await screen.findByRole('checkbox', {
      name: /italian seasoning/i });
    const ingred7 = await screen.findByRole('checkbox', {
      name: /basil/i });
    const ingred8 = await screen.findByRole('checkbox', {
      name: /parmigiano/i });

    const allingred = await screen.findAllByTestId(/ingredient-name-and-measure/i);

    expect(allingred.length).toBe(8);

    const finishBtn = await screen.findByRole('button', {
      name: /finish recipe/i,
    });

    expect(finishBtn).toBeDisabled();

    userEvent.click(ingred1);
    userEvent.click(ingred2);
    userEvent.click(ingred3);
    userEvent.click(ingred4);
    userEvent.click(ingred5);
    userEvent.click(ingred6);
    userEvent.click(ingred7);
    userEvent.click(ingred8);

    expect(finishBtn).not.toBeDisabled();

    const imgEl = await screen.findByTestId('recipe-photo');
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(imgEl).toHaveAttribute('alt', 'Spicy Arrabiata Penne');

    userEvent.click(finishBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('verify if the drinks in progress contains the expected elements', async () => {
    gigaMock('thecocktail', '178319');
    renderWithRouter(<App />, [url]);

    const ingred1 = await screen.findByRole('checkbox', {
      name: /hpnotiq/i });
    const ingred2 = await screen.findByRole('checkbox', {
      name: /pineapple juice/i });
    const ingred3 = await screen.findByRole('checkbox', {
      name: /banana liqueur/i });

    const allingred = await screen.findAllByTestId(/ingredient-name-and-measure/i);

    expect(allingred.length).toBe(3);

    const finishBtn = await screen.findByRole('button', {
      name: /finish recipe/i,
    });

    expect(finishBtn).toBeDisabled();

    userEvent.click(ingred1);
    userEvent.click(ingred2);
    userEvent.click(ingred3);

    expect(finishBtn).not.toBeDisabled();

    userEvent.click(ingred1);

    expect(finishBtn).toBeDisabled();

    const imgEl = await screen.findByTestId('recipe-photo');
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(imgEl).toHaveAttribute('alt', 'Aquamarine');
  });
  test('verify if the finish button stays disable when the recipe is not done and copy and favorite button is working', async () => {
    gigaMock('themeal', '52771');
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
      meals: { 52771: [
        { strIngredient: 'penne rigate', strMeasure: ' - 1 pound', checked: 'false' },
        { strIngredient: 'olive oil', strMeasure: ' - 1/4 cup', checked: 'true' },
        { strIngredient: 'garlic', strMeasure: ' - 3 cloves', checked: 'false' },
        { strIngredient: 'chopped tomatoes', strMeasure: ' - 1 tin ', checked: 'true' },
        { strIngredient: 'red chile flakes', strMeasure: ' - 1/2 teaspoon', checked: 'false' },
        { strIngredient: 'italian seasoning', strMeasure: ' - 1/2 teaspoon', checked: 'true' },
        { strIngredient: 'basil', strMeasure: ' - 6 leaves', checked: 'false' },
        { strIngredient: 'Parmigiano-Reggiano', strMeasure: ' - spinkling', checked: 'true' },
      ] } }));
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '52771' }]));
    renderWithRouter(<App />, ['/foods/52771/in-progress']);

    const finishBtn = await screen.findByRole('button', {
      name: /finish recipe/i,
    });

    expect(finishBtn).toBeDisabled();

    const favBtn = await screen.findByTestId('favorite-btn');

    expect(favBtn).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', blackHeartIcon);

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
  test('verify if the finish recipe button is enable after the recipe is done and redirects to /done-recipes', async () => {
    gigaMock('thecocktail', '178319');
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {},
      cocktail: { 178319: [
        { strIngredient: 'Hpnotiq', strMeasure: ' - 2 oz', checked: 'true' },
        { strIngredient: 'Pineapple Juice', strMeasure: ' - 1 oz', checked: 'true' },
        { strIngredient: 'Banana Liqueur', strMeasure: ' - 1 oz', checked: 'true' },
      ] } }));
    const { history } = renderWithRouter(<App />, [url]);

    await waitFor(() => {
      const finishBtn = screen.getByRole('button', {
        name: /finish recipe/i,
      });
      expect(finishBtn).not.toBeDisabled();
      userEvent.click(finishBtn);
    });
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('verify if the favorite button is working propperly', async () => {
    gigaMock('thecocktail', '178319');
    renderWithRouter(<App />, [url]);

    const favBtn = await screen.findByTestId('favorite-btn');

    expect(favBtn).toBeInTheDocument();

    expect(favBtn).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', whiteHeartIcon);
  });
  test('', async () => {
    gigaMock('thecocktail', '178319');
    renderWithRouter(<App />, [url]);
  });
});
