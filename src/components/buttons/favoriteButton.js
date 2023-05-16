import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FavoriteButton({ recipe }) {
  // console.log(recipe);
  const [favorite, setFavorite] = useState(false);

  const iconPath = favorite ? blackHeartIcon : whiteHeartIcon;
  const idPath = window.location.pathname.split('/')[2];
  const typePath = window.location.pathname.split('/')[1];

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
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

    if (isAlreadyFavorite) {
      const newFavoriteRecipes = favoriteRecipes
        .filter((favRecipe) => favRecipe.id !== idPath);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      favoriteRecipes.push(recipeData);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }

    setFavorite(!favorite);
  }

  return (
    <div className="div-favorite-btn">
      <button
        className="hover:bg-red-500 rounded hover:scale-125 duration-500"
        type="button"
        data-testid="favorite-btn"
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

FavoriteButton.propTypes = {
  recipe: PropTypes.shape().isRequired,
};

export default FavoriteButton;
