import React from 'react';
import { useHistory } from 'react-router-dom';

import doneIcon from '../images/doneIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';
import yellowHearthIcon from '../images/yellowHearthIcon.svg';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();

  const getLS = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="h-screen flex flex-col">
      <Header title="Profile" searchBool={ false } />
      <div
        className="rounded-md p-2 bg-slate-200/50 m-auto flex flex-col justify-center items-center h-60"
      >
        <p
          className="text-3xl"
          data-testid="profile-email"
        >
          {getLS && getLS.email}
        </p>
        <button
          className="flex p-4 text-lg w-60"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          <img
            className="pr-2"
          src={ doneIcon } alt="done icon" />
          Done Recipes
        </button>

        <button
          className="flex p-4 text-lg w-60"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          <img
            className="pr-2"
          src={ yellowHearthIcon } alt="heart icon" />
          Favorite Recipes
        </button>

        <button
          className="flex p-4 text-lg w-60"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          <img
            className="pr-2"
          src={ logoutIcon } alt="logout icon" />
          Logout
        </button>
      </div>
      <Footer history={ history } />
    </div>
  );
}
