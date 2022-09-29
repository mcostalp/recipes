import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente Header', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('1- Testa os elementos presentes no Header', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const profileBtn = screen.getByTestId('profile-top-btn');
    const heading = screen.getByTestId('page-title');
    const searchBtnIcon = screen.getByTestId('search-top-btn');

    expect(heading).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtnIcon).toBeInTheDocument();

    userEvent.click(searchBtnIcon);
    const buttonSearch = screen.getByRole('button');

    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();

    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });
});
