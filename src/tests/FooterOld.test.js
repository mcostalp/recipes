import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Footer component tests', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('test if the buttons are rendered', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'minhoca321');
    userEvent.click(loginBtn);

    const drinkIconBtn = screen.getByTestId('drinks-bottom-btn');
    const mealIconBtn = screen.getByTestId('meals-bottom-btn');

    expect(drinkIconBtn).toBeInTheDocument();
    expect(mealIconBtn).toBeInTheDocument();
  });

  test('on click in drinks icon, the buttons redirect to the correct path', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const drinkIconBtn = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkIconBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('on click in meals icon, the buttons redirect to the correct path', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const mealIconBtn = screen.getByTestId('meals-bottom-btn');

    userEvent.click(mealIconBtn);

    expect(history.location.pathname).toBe('/meals');
  });
});
