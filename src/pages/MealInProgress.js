import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import listOfIngredients from '../services/listOfIngredients';
import ShareButton from '../components/buttons/shareButton';
import FavoriteButton from '../components/buttons/favoriteButton';

function MealInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [copyLink, setCopyLink] = useState(false);
  const [doneRecipesMock, setDoneRecipesMock] = useState([]);
  const dateNow = new Date();
  const location = window.location.href;
  const share = location.replace(/(\/(?:meals|drinks)\/\d+)\/.*/, '$1');

  const handleClickShareBtn = () => {
    copy(share);
    setCopyLink(true);
  };

  const tags = recipe.strTags ? recipe.strTags.split(',') : [];

  useEffect(() => {
    const saveProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };
    setIsChecked(saveProgressLS.meals[id] || []);
  }, [id]);

  useEffect(() => {
    async function fetchRecipeData() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const result = data.meals[0];
      setRecipe(result);
      // console.log(result);
    }

    fetchRecipeData();
  }, [id]);

  // if (!recipe) {
  //   return <p>Loading...</p>;
  // }

  const doneRecipes =
    {
      id,
      type: 'meal',
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: dateNow.toISOString(),
      tags,
    };

  const onChange = ({ target }) => {
    const { checked } = target;
    const saveProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };

    if (!saveProgressLS.meals[id]) {
      saveProgressLS.meals[id] = [];
    }

    if (checked) {
      saveProgressLS.meals[id].push(target.name);
    } else {
      saveProgressLS.meals[id] = saveProgressLS.meals[id]
        .filter((item) => item !== target.name);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(saveProgressLS));
    setIsChecked(saveProgressLS.meals[id]);
  };

  const handleClick = () => {
    const recipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'))
      || doneRecipesMock;

    setDoneRecipesMock(recipesFromLocalStorage);
    history.push('/done-recipes');
    localStorage.setItem('doneRecipes', JSON.stringify([...recipesFromLocalStorage, doneRecipes]));
  };

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
  } = recipe;

  const ingredients = listOfIngredients(recipe);

  return (
    <div className="relative flex flex-col">
      <h1 className="text-white text-2xl text-center" data-testid="recipe-title">
        {strMeal}
      </h1>
      <h4 className="text-white text-2xl" data-testid="recipe-category">
        {strCategory}
      </h4>
      <img
        className="h-60 w-60 rounded-xl m-auto"
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <div className="flex absolute w-14 gap-2 top-64 left-64">
        <FavoriteButton recipe={ recipe } />
        <ShareButton
          testId="share-btn"
          handleClickShareBtn={ () => handleClickShareBtn() }
        />
      </div>
      { copyLink && <p className="text-green-400 text-center text-sm">Link copied!</p>}
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

export default MealInProgress;
