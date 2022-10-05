import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('test profile page', () => {
  beforeEach(() => {
    global.localStorage.setItem('user', JSON.stringify({ email: 'batata@gmail.com' }));
  });
  test('verify if the email appears on screen and if the Done Recipes button is working', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const userNameEl = screen.getByRole('heading', {
      name: /batata@gmail\.com/i,
    });
    const doneBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });

    expect(userNameEl).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();

    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('verify if favorite recipes button is working', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const favBtn = screen.getByRole('button', {
      name: /Favorite Recipes/i,
    });

    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('verify if logout button is working', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });

    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
