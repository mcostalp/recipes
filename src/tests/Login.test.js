import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa a página de Login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('1 - Testa os elementos presentes na página', () => {
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
  });
});
