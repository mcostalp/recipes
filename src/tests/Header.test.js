import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('test header component', () => {
  test('verify where header should appear', () => {
    const { history } = renderWithRouter(<App />, ['/foods']);

    const headerEl = screen.getByTestId('page-title');
    const headerBtn = screen.getByTestId('search-top-btn');
    expect(history.location.pathname).toBe('/foods');
    expect(headerEl).toBeInTheDocument();

    userEvent.click(headerBtn);

    history.push('/drinks');

    expect(history.location.pathname).toBe('/drinks');
    // headerEl = screen.getByTestId('page-title');
    expect(headerEl).toBeInTheDocument();

    const btnProfileEl = screen.getByTestId('profile-top-btn');
    userEvent.click(btnProfileEl);

    expect(history.location.pathname).toBe('/profile');

    history.push('/foods/1');
    // headerEl = screen.queryByTestId('page-title');
    expect(headerEl).not.toBeInTheDocument();

    history.push('/drinks/1');
    // headerEl = screen.queryByTestId('page-title');
    expect(headerEl).not.toBeInTheDocument();

    history.push('/foods/1/in-progress');
    // headerEl = screen.queryByTestId('page-title');
    expect(headerEl).not.toBeInTheDocument();

    history.push('/drinks/1/in-progress');
    // headerEl = screen.queryByTestId('page-title');
    expect(headerEl).not.toBeInTheDocument();
  });
  test('verify what should appear on the profile, done recipes and favorite recipes page', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);
    const headerBtn = screen.getByTestId('search-top-btn');

    const profileEl = screen.getByTestId('profile-top-btn');
    const profileName = screen.getByRole('heading', { name: /^profile$/i, level: 1 });
    // let profileLink = screen.getByTestId('profile-top-btn');

    expect(profileEl).toBeInTheDocument();
    expect(profileName).toBeInTheDocument();
    expect(screen.queryByTestId(headerBtn)).not.toBeInTheDocument();

    history.push('/done-recipes');
    // profileEl = screen.getByTestId('profile-top-btn');
    // profileLink = screen.getByTestId('profile-top-btn');

    const doneRecipesName = screen.getByRole('heading', { name: /^Done Recipes$/i, level: 1 });

    expect(profileEl).toBeInTheDocument();
    expect(doneRecipesName).toBeInTheDocument();
    expect(screen.queryByTestId(headerBtn)).not.toBeInTheDocument();

    history.push('/favorite-recipes');
    // profileEl = screen.getByTestId('profile-top-btn');
    // profileLink = screen.getByTestId('profile-top-btn');
    expect(profileEl).toBeInTheDocument();

    const favRecipesName = screen.getByRole('heading', { name: /^Favorite Recipes$/i, level: 1 });

    expect(profileEl).toBeInTheDocument();
    expect(favRecipesName).toBeInTheDocument();
    expect(screen.queryByTestId(headerBtn)).not.toBeInTheDocument();
  });
});
