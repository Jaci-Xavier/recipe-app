import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import Slider from 'react-slick';
import listOfIngredients from '../services/listOfIngredients';
import { fetchRecipesDrinks } from '../services/fetchRecipes';
import StartRecipeButton from '../components/buttons/startRecipeButton';
import FavoriteButton from '../components/buttons/favoriteButton';
import ShareButton from '../components/buttons/shareButton';

const MAX_DRINKS = 6;

function MealsDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);
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
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals[0]);
      const drinks = await fetchRecipesDrinks();
      setDrinksRecommendation(drinks.slice(0, MAX_DRINKS));
      // if (Array.isArray(drinks)) {
      // } é mesmo preciso dessa linha de código?
    }

    fetchRecipeData();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipe;

  const ingredients = listOfIngredients(recipe);

  return (
    <div>
      <h1 data-testid="recipe-title">
        {strMeal}
      </h1>
      <ShareButton
        testId="share-btn"
        handleClickShareBtn={ () => handleClickShareBtn() }
      />
      {copyLink && <small>Link copied!</small>}
      <FavoriteButton testId="favorite-btn" recipe={ recipe } />
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <p
        className="text-slate-200 font-semibold italic"
        data-testid="recipe-category"
      >
        Categoria:
        {strCategory}
      </p>
      <h3
        className="text-center bg-slate-50
         bg-opacity-70 text-orange-700 font-bold text-md "
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
        className="text-center bg-slate-50
         bg-opacity-70 text-orange-700 font-bold text-md "
      >
        Modo de Preparo:

      </h3>
      <p
        className="flex-col h-2/6 justify-around bg-slate-50 bg-opacity-60 border-2
      border-gray-500 rounded-lg flex p-3"
        data-testid="instructions"
      >
        {strInstructions}
      </p>

      <iframe
        title="video"
        data-testid="video"
        src={ strYoutube }
      />
      <Slider { ...settings }>
        {drinksRecommendation.map((drink, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ drink.idDrink }
          >
            <h2
              data-testid={ `${index}-recommendation-title` }
            >
              {drink.strDrink}
            </h2>
            <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
          </div>
        ))}
      </Slider>
      <StartRecipeButton />
    </div>
  );
}

export default MealsDetails;
