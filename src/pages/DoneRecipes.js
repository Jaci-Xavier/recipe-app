import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const history = useHistory();
  const [filtredDoneRecipes, setFiltredDoneRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  const handleClickFilter = (type) => {
    let filtredRecipe = [];
    switch (type) {
    case 'drink':
      filtredRecipe = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setFiltredDoneRecipes(filtredRecipe);
      break;
    case 'meal':
      filtredRecipe = doneRecipes.filter((recipe) => recipe.type === 'meal');
      setFiltredDoneRecipes(filtredRecipe);
      break;
    default:
      setFiltredDoneRecipes([]);
      break;
    }
  };

  return (
    <>
      <Header title="Done Recipes" searchBool={ false } />
      <div className="flex flex-col pt-2">
        <div
          className="flex justify-around"
        >
          <button
            className="bg-gray-500 opacity-80 p-1 rounded-md hover:opacity-100 text-white"
            data-testid="filter-by-all-btn"
            onClick={ () => handleClickFilter('doneRecipes') }
          >
            All

          </button>
          <button
            className="bg-gray-500 opacity-80 p-1 rounded-md hover:opacity-100 text-white"
            data-testid="filter-by-meal-btn"
            onClick={ () => handleClickFilter('meal') }
            value="meal"
          >
            Meals

          </button>
          <button
            className="bg-gray-500 opacity-80 p-1 rounded-md hover:opacity-100 text-white"
            data-testid="filter-by-drink-btn"
            onClick={ () => handleClickFilter('drink') }
            value="drink"
          >
            Drinks

          </button>
        </div>
        <section className="m-auto">
          {(filtredDoneRecipes.length ? filtredDoneRecipes : doneRecipes)
            .map((recipe, index) => (
              <CardRecipe recipe={ recipe } index={ index } key={ index } />
            ))}
        </section>
      </div>
      <Footer history={ history } />
    </>
  );
}
