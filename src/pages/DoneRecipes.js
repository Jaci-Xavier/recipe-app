import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import shareBtn from '../images/shareIcon.svg';
import Header from '../components/Header';
import ShareButton from '../components/buttons/shareButton';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const history = useHistory();
  const [filtredDoneRecipes, setFiltredDoneRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  const handleClickShareBtn = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyLink(true);
  };

  const handleClickFilter = (type) => {
    let filtredRecipe = [];
    switch (type) {
    case 'drink':
      filtredRecipe = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setFiltredDoneRecipes(filtredRecipe);
      console.log('drink');
      break;
    case 'meal':
      filtredRecipe = doneRecipes.filter((recipe) => recipe.type === 'meal');
      setFiltredDoneRecipes(filtredRecipe);
      console.log('meal');
      break;
    default:
      setFiltredDoneRecipes([]);
      // setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
      console.log('all');
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
              <div
                className="bg-slate-200/50 w-64 mt-3 pt-1
                rounded-md relative border-2 border-slate-500"
                key={ recipe.id }
              >
                <div className="absolute top-56 left-52">
                  <ShareButton
                    src={ shareBtn }
                    testId={ `${index}-horizontal-share-btn` }
                    handleClickShareBtn={
                      () => handleClickShareBtn(recipe.type, recipe.id)
                    }
                  />
                </div>
                <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
                  <img
                    className="h-60 w-60 rounded-xl m-auto mt-2"
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </a>
                {copyLink && (
                  <p
                    className="text-green-600 text-center text-sm"
                  >
                    Link copied!
                  </p>
                )}
                <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
                  <p
                    className="text-center"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </p>
                </a>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} -
                  ${recipe.category} - ${recipe.alcoholicOrNot}`}
                </p>

                <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
                <div>
                  {recipe.tags.map((tagName) => (
                    <p
                      key={ tagName }
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                    >
                      {tagName}
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </section>
      </div>
      <Footer history={ history }/>
    </>
  );
}
