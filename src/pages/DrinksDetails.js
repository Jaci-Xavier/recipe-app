import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import copy from 'clipboard-copy';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import listOfIngredients from '../services/listOfIngredients';
import { fetchRecipesMeals } from '../services/fetchRecipes';
import StartRecipeButton from '../components/buttons/startRecipeButton';
import ShareButton from '../components/buttons/shareButton';
import FavoriteButton from '../components/buttons/favoriteButton';

const MAX_MEALS = 6;

function DrinksDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);
  const [copyLink, setCopyLink] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const handleClickShareBtn = () => {
    copy(window.location.href);
    setCopyLink(true);
  };

  useEffect(() => {
    async function fetchRecipeData() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.drinks[0]);
      const meals = await fetchRecipesMeals();
      setMealsRecommendation(meals.slice(0, MAX_MEALS));
    }

    fetchRecipeData();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strInstructions,
    strYoutube,
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
      <img
        className="h-60 w-60 rounded-xl m-auto"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <div className="flex absolute w-14 gap-2 top-60 left-64">
        <FavoriteButton testId="favorite-btn" recipe={ recipe } />
        <ShareButton
          testId="share-btn"
          handleClickShareBtn={ () => handleClickShareBtn() }
        />
      </div>
      {copyLink && (
        <small
          className="text-green-400 text-center"
        >
          Link copied!
        </small>
      )}
      <p
        className="text-slate-200 font-semibold italic"
        data-testid="recipe-category"
      >
        {`Categoria: ${strCategory} ${strAlcoholic}`}
      </p>
      <div className="pl-2">
        <h3
          className="text-center bg-slate-50 bg-opacity-70
         text-orange-700 font-bold text-md "
        >
          Ingredientes

        </h3>
        <ul
          className="flex-col h-2/6 justify-around bg-slate-50 bg-opacity-60 border-2
      border-gray-500 rounded-lg flex p-3 text-center"
        >
          {ingredients.map(({ ingredient, measure }, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              {` ${measure} - ${ingredient}`}
            </li>
          ))}
        </ul>
        <h3
          className="text-center bg-slate-50 bg-opacity-70
         text-orange-700 font-bold text-md "
        >
          Modo de Preparo

        </h3>
        <p
          className="flex-col h-2/6 justify-around bg-slate-50 bg-opacity-60 border-2
      border-gray-500 rounded-lg flex p-3 text-center"
          data-testid="instructions"
        >
          {strInstructions}
        </p>

        <iframe
          title="video"
          data-testid="video"
          src={ strYoutube }
        />
      </div>
      <p className="text-black">Opções de Bebidas</p>
      <Slider { ...settings }>
        {mealsRecommendation.map((meal, index) => (
          <div
            className="w-full m-auto p-2"
            key={ meal.idMeal }
            data-testid={ `${index}-recommendation-card` }
          >
            <h2
              className="text-black pl-2"
              data-testid={ `${index}-recommendation-title` }
            >
              {meal.strMeal}
            </h2>
            <img
              className="h-50 w-50 rounded-xl m-auto"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>
        ))}
      </Slider>
      <div className="mt-16">
        <StartRecipeButton />
      </div>
    </div>
  );
}

export default DrinksDetails;
