import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const searchIcon = 'search-top-btn';
describe('Header component tests', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('if search icon is rendering', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'test123456');
    userEvent.click(loginBtn);

    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId(searchIcon)).toBeInTheDocument();
  });

  test('on click in search icon, the bar is on the screen', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');

    userEvent.click(screen.getByTestId(searchIcon));
    const searchBar = screen.getByTestId('search-input');

    expect(history.location.pathname).toBe('/meals');
    expect(searchBar).toBeInTheDocument();

    userEvent.click(screen.getByTestId(searchIcon));
    waitForElementToBeRemoved(searchBar);
  });

  test('on click in search icon, radios options and search button is on the screen', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');

    userEvent.click(screen.getByTestId(searchIcon));

    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
  });
});
