import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FavoriteButton({ recipe, testId }) {
  const [favorite, setFavorite] = useState(false);

  const iconPath = favorite ? blackHeartIcon : whiteHeartIcon;
  const idPath = window.location.pathname.split('/')[2];
  const typePath = window.location.pathname.split('/')[1];

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || {};
    const isAlreadyFavorite = favoriteRecipes
      .some((favRecipe) => favRecipe.id === idPath);
    setFavorite(isAlreadyFavorite);
  }, [idPath]);

  function handleFavoriteClick() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isAlreadyFavorite = favoriteRecipes
      .some((favRecipe) => favRecipe.id === idPath);

    const recipeData = typePath === 'drinks' ? (
      {
        id: idPath,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      })
      : (
        {
          id: idPath,
          type: 'meal',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
        });

    console.log(recipeData);
    if (isAlreadyFavorite) {
      const newFavoriteRecipes = favoriteRecipes
        .filter((favRecipe) => favRecipe.id !== idPath);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      favoriteRecipes.push(recipeData);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }

    setFavorite(!favorite);
    console.log(favoriteRecipes);
  }

  return (
    <div className="div-favorite-btn">
      <button
        type="button"
        data-testid={ testId }
        onClick={ handleFavoriteClick }
        src={ iconPath }
      >
        <img
          src={ iconPath }
          alt={ favorite ? 'Favoritado' : 'Não favoritado' }
        />
      </button>
    </div>
  );
}

// FavoriteButton.defaultProps = {
//   idMeal: '',
//   strMeal: '',
//   strMealThumb: '',
//   strDrink: '',
//   strDrinkThumb: '',
//   strArea: '',
//   strInstructions: '',
//   strAlcoholic: '',
// };

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  testId: PropTypes.string.isRequired,
};

export default FavoriteButton;
