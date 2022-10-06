import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('test food component', () => {
  test('verify if food button is working properly', () => {
    const { history } = renderWithRouter(<App />, ['/foods']);

    const footerEl = screen.getByTestId('footer');

    expect(footerEl).toBeInTheDocument();

    const foodBtn = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodBtn);

    expect(history.location.pathname).toBe('/foods');
  });
  test('verify if drinks button is working properly', () => {
    const { history } = renderWithRouter(<App />, ['/foods']);

    const foodBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(foodBtn);

    expect(history.location.pathname).toBe('/drinks');
  });
});
