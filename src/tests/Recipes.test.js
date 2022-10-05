import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import gigaMock from './Mocks/fetchMock';

describe('', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('verify if the /foods page contains the expected elements', async () => {
    gigaMock('themeal');
    renderWithRouter(<App />, ['/foods']);

    const beefBtn = await screen.findByRole('button', {
      name: /^beef$/i,
    });
    const breakfastBtn = await screen.findByRole('button', {
      name: /^breakfast$/i,
    });
    const chickenBtn = await screen.findByRole('button', {
      name: /^chicken$/i,
    });
    const dessertBtn = await screen.findByRole('button', {
      name: /^dessert$/i,
    });
    const goatBtn = await screen.findByRole('button', {
      name: /^goat$/i,
    });
    const allBtn = await screen.findByRole('button', {
      name: /^all$/i,
    });

    const cardnameEl = await screen.findAllByTestId(/card-name/i);
    const cardEl = await screen.findAllByTestId(/recipe-card/i);
    const cardimgEl = await screen.findAllByTestId(/card-img/i);

    expect(cardEl.length).toBe(12);
    expect(cardimgEl.length).toBe(12);
    expect(cardnameEl.length).toBe(12);

    userEvent.click(beefBtn);
    userEvent.click(breakfastBtn);
    userEvent.click(chickenBtn);
    userEvent.click(dessertBtn);
    userEvent.click(goatBtn);
    userEvent.click(allBtn);
  });
  test('verify if the /drinks page contains the expected elements', async () => {
    gigaMock('thecocktail');
    renderWithRouter(<App />, ['/drinks']);

    const ordinaryBtn = await screen.findByRole('button', {
      name: /ordinary drink/i,
    });
    const cocktailBtn = await screen.findByRole('button', {
      name: /cocktail/i,
    });
    const shakeBtn = await screen.findByRole('button', {
      name: /shake/i,
    });
    const otherBtn = await screen.findByRole('button', {
      name: /other\/unknown/i,
    });
    const cocoaBtn = await screen.findByRole('button', {
      name: /cocoa/i,
    });
    const allBtn = await screen.findByRole('button', {
      name: /all/i,
    });

    userEvent.click(ordinaryBtn);
    userEvent.click(cocktailBtn);
    userEvent.click(shakeBtn);
    userEvent.click(otherBtn);
    userEvent.click(cocoaBtn);
    userEvent.click(allBtn);

    const cardContainer = await screen.findByTestId('4-recipe-card');
    expect(cardContainer).toBeInTheDocument();
  });
});
