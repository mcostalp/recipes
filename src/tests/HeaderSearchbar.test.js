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

  test('on click in search icon, the bar and filters are on the screen', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');
    // testes

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

  test('Test name filter', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');

    userEvent.click(screen.getByTestId(searchIcon));

    const searchBar = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const nameFilter = screen.getByTestId('name-search-radio');

    userEvent.type(searchBar, 'egg');
    userEvent.click(nameFilter);
    userEvent.click(searchBtn);

    act(() => {
      userEvent.type(searchBar, 'gg');
      userEvent.click(nameFilter);
      userEvent.click(searchBtn);
    });
    const searchResult = await screen.findByText(/egg/i);

    // const searchResult = await screen.findByText(/meals/i);
    expect(searchResult).toBeInTheDocument();

    await waitFor(() => {
      expect(searchResult).toBeInTheDocument();
    });
  });

  // });

  test('Verify if on profile icon click, redirect to profile page.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');

    const profileIcon = screen.getByTestId('profile-top-btn');

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');

    const profileHeading = screen.getByText(/Profile/i);
    expect(profileHeading).toBeInTheDocument();
  });

  test('Verify if on drinks icon click, redirect to drinks page.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const drinkIconBtn = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkIconBtn);

    expect(history.location.pathname).toBe('/drinks');

    const drinksHeading = screen.getByText(/drinks/i);
    expect(drinksHeading).toBeInTheDocument();
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

  test('Test name filter', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    userEvent.click(screen.getByTestId(searchIcon));

    const searchBar = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const nameFilter = screen.getByTestId('name-search-radio');

    userEvent.type(searchBar, 'vodka');
    userEvent.click(nameFilter);
    userEvent.click(searchBtn);

    act(() => {
      userEvent.type(searchBar, 'vodka');
      userEvent.click(nameFilter);
      userEvent.click(searchBtn);
    });
    const searchResult = await screen.findByText(/vodka/i);

    // const searchResult = await screen.findByText(/meals/i);
    expect(searchResult).toBeInTheDocument();

    await waitFor(() => {
      expect(searchResult).toBeInTheDocument();
    });
  });
});
