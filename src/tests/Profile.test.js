import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';
import LoginProvider from '../context/LoginProvider';
import RecipesProvider from '../context/RecipesProvider';
import mockCypress from '../../cypress/mocks/fetch';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const PROFILE_TOP_BTN = 'profile-top-btn';
xdescribe('Verificando a funcionalidade da página Profile', () => {
  beforeEach(() => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockCypress);
  });
  test('Verifica a funcionalidade da rota "/profile".', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <LoginProvider>
          <RecipesProvider>
            <App />
          </RecipesProvider>
        </LoginProvider>
      </Router>,
    );

    const emailElement = screen.getByTestId(EMAIL_INPUT);
    const passwordElement = screen.getByTestId(PASSWORD_INPUT);
    const btnElement = screen.getByTestId(LOGIN_SUBMIT_BTN);
    await waitFor(() => {
      userEvent.type(emailElement, 'trybe@teste.com');
      userEvent.type(passwordElement, '1234567');
      userEvent.click(btnElement);
    });

    expect(await screen.findByRole('button', { name: /beef/i })).toBeInTheDocument();

    const btnProfile = screen.getByTestId(PROFILE_TOP_BTN);
    await waitFor(() => {
      userEvent.click(btnProfile);
    });
    const btnDoneRecipes = await screen.findByTestId('profile-done-btn');
    await waitFor(() => {
      userEvent.click(btnDoneRecipes);
    });
    const btn = screen.getByTestId(PROFILE_TOP_BTN);
    await waitFor(() => {
      userEvent.click(btn);
    });
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    await waitFor(() => {
      userEvent.click(btnFavoriteRecipes);
    });
    const btn1 = screen.getByTestId(PROFILE_TOP_BTN);
    await waitFor(() => {
      userEvent.click(btn1);
    });
    const btnLogout = screen.getByTestId('profile-logout-btn');
    await waitFor(() => {
      userEvent.click(btnLogout);
    });
  });
});
