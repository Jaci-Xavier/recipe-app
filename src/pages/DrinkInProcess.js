import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import listOfIngredients from '../services/listOfIngredients';

import ShareButton from '../components/buttons/shareButton';
import FavoriteButton from '../components/buttons/favoriteButton';

function DrinksInProcess() {
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isChecked, setIsChecked] = useState({});
  const [copyLink, setCopyLink] = useState(false);
  const [doneRecipesMock, setDoneRecipesMock] = useState([]);
  const dateNow = new Date();
  const location = window.location.href;
  // console.log('linha 18', location);
  const share = location.replace(/(\/(?:meals|drinks)\/\d+)\/.*/, '$1');

  const handleClickShareBtn = () => {
    copy(share);
    setCopyLink(true);
  };

  useEffect(() => {
    const saveProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };
    setIsChecked(saveProgressLS.drinks[id] || []);
  }, [id]);

  useEffect(() => {
    async function fetchRecipeData() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const result = data.drinks[0];
      setRecipe(result);
    }

    fetchRecipeData();
  }, [id]);

  const tags = recipe.strTags ? recipe.strTags.split(',') : [];

  // if (!recipe) {
  //   return <p>Loading...</p>;
  // }

  const doneRecipes = [
    {
      id,
      type: 'drink',
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: dateNow.toISOString(),
      tags,
    },
  ];

  const onChange = ({ target }) => {
    const { checked } = target;
    const saveProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };

    if (!saveProgressLS.drinks[id]) {
      saveProgressLS.drinks[id] = [];
    }

    if (checked) {
      saveProgressLS.drinks[id].push(target.name);
    } else {
      saveProgressLS.drinks[id] = saveProgressLS.drinks[id]
        .filter((item) => item !== target.name);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(saveProgressLS));
    setIsChecked(saveProgressLS.drinks[id]);
  };

  const handleClick = () => {
    const recipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'))
      || doneRecipesMock;

    setDoneRecipesMock(recipesFromLocalStorage);
    history.push('/done-recipes');
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  };

  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
  } = recipe;

  const ingredients = listOfIngredients(recipe);

  return (
    <div className="relative flex flex-col">
      <h1
        className="text-white text-2xl text-center"
        data-testid="recipe-title"
      >
        {strDrink}
      </h1>
      <h4 data-testid="recipe-category">
        {strCategory}
      </h4>
      <img
        className="h-60 w-60 rounded-xl m-auto"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <div className="flex absolute w-14 gap-2 top-64 left-64">
        <FavoriteButton recipe={ recipe } />
        <ShareButton
          testId="share-btn"
          handleClickShareBtn={ () => handleClickShareBtn() }
        />
      </div>
      { copyLink && <small className="text-green-400 text-center">Link copied!</small>}
      <h3 className="text-white text-2xl m-2">Ingredientes</h3>
      <div
        className="flex flex-col justify-around bg-slate-50 bg-opacity-60 border-2
        border-gray-500 rounded-lg p-3"
      >
        {ingredients.map(({ ingredient, measure }, index) => {
          const isCheckedIngredient = isChecked.includes(ingredient);
          const textDecoration = isCheckedIngredient
            ? 'line-through solid rgb(0, 0, 0)' : '';
          return (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              style={ { textDecoration } }
            >
              <input
                className="accent-lime-600"
                type="checkbox"
                name={ ingredient }
                value={ ingredient }
                checked={ isCheckedIngredient }
                onChange={ onChange }
              />
              <label htmlFor={ ingredient }>
                {` ${measure} - ${ingredient}`}
              </label>
            </label>
          );
        })}
      </div>
      <h2 className="text-white text-2xl m-2">Instructions</h2>
      <p
        className="flex flex-col justify-around bg-slate-50 bg-opacity-60 border-2
        border-gray-500 rounded-lg p-3"
        data-testid="instructions"
      >
        {strInstructions}
      </p>
      <button
        className=" border-sky-600 border-4 bg-sky-500
        hover:scale-150 duration-300 w-full mt-2 text-white"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isChecked.length !== Object.keys(ingredients).length }
        onClick={ () => handleClick() }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default DrinksInProcess;
