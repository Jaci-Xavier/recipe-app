import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';
import Footer from '../components/Footer';

export default function FavoriteRecipes() {
  const history = useHistory();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  useMemo(() => ({
    favoriteRecipes,
  }), [favoriteRecipes]);

  const handleFavoriteRemove = (id) => {
    const updatedRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes([...updatedRecipes]);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
  };

  const handleClickFilter = (type) => {
    let filteredRecipes = [];
    switch (type) {
    case 'meal':
      filteredRecipes = favoriteRecipes.filter((recipe) => recipe.type === 'meal');
      break;
    case 'drink':
      filteredRecipes = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
      break;
    default:
      filteredRecipes = favoriteRecipes;
      break;
    }
    setFilteredFavoriteRecipes(filteredRecipes);
  };

  return (
    <div>
      <Header title="Favorite Recipes" searchBool={ false } />
      <section className="flex flex-col pt-2">
        <div className="flex justify-around">
          <button
            className="bg-gray-500 opacity-80 p-1 rounded-md hover:opacity-100 text-white"
            data-testid="filter-by-all-btn"
            onClick={ () => handleClickFilter('all') }
          >
            All

          </button>
          <button
            className="bg-gray-500 opacity-80 p-1 rounded-md hover:opacity-100 text-white"
            data-testid="filter-by-meal-btn"
            onClick={ () => handleClickFilter('meal') }
          >
            Meals

          </button>
          <button
            className="bg-gray-500 opacity-80 p-1 rounded-md hover:opacity-100 text-white"
            data-testid="filter-by-drink-btn"
            onClick={ () => handleClickFilter('drink') }
          >
            Drinks

          </button>
        </div>
      </section>
      <section className="m-auto flex flex-col items-center">
        {(filteredFavoriteRecipes.length > 0 ? filteredFavoriteRecipes : favoriteRecipes)
          .map((recipe, index) => (
            <CardFavorite
              recipe={ recipe }
              index={ index }
              key={ index }
              handleFavoriteRemove={ handleFavoriteRemove }
            />
          ))}
      </section>
      <Footer history={ history } />
    </div>
  );
}
