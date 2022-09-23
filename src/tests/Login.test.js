import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('test login page', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'sen');
    expect(loginBtn).toBeDisabled();

    userEvent.type(passwordInput, 'senha123');
    expect(loginBtn).not.toBeDisabled();

    userEvent.clear(passwordInput);
    expect(loginBtn).toBeDisabled();

    userEvent.type(passwordInput, 'minhoca321');
    userEvent.click(loginBtn);

    // const foodEl = screen.getByRole('heading', { name: /^foods$/i, level: 1 });
    // expect(foodEl).toBeInTheDocument();
  });
});
