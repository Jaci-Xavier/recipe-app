import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import ShareButton from './buttons/shareButton';
import shareBtn from '../images/shareIcon.svg';
import blackHeartIcon from '../images/heart-fill.svg';

function CardFavorite({ recipe, index, handleFavoriteRemove }) {
  const [copyLink, setCopyLink] = useState(false);
  const history = useHistory();
  const handleClickShareBtn = (type, id) => {
    const FIX = 2000;
    copy(window.location.href.replace('favorite-recipes', `${type}s/${id}`));
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, FIX);
  };

  return (
    <div
      className="bg-slate-200/50 w-64 mt-3 pt-1
                rounded-md relative border-2 border-slate-500"
    >
      <div className="absolute top-52 left-44 flex">
        <button
          className="mr-1"
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => handleFavoriteRemove(recipe.id) }
          src={ blackHeartIcon }
        >
          <img
            src={ blackHeartIcon }
            alt="Remover"
          />
        </button>
        <ShareButton
          src={ shareBtn }
          testId={ `${index}-horizontal-share-btn` }
          handleClickShareBtn={
            () => handleClickShareBtn(recipe.type, recipe.id)
          }
        />
      </div>
      <button
        type="button"
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      >
        <img
          className="h-60 w-60 rounded-xl m-auto mt-2"
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </button>
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
    </div>
  );
}

CardFavorite.propTypes = {
  index: PropTypes.number.isRequired,
  handleFavoriteRemove: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
export default CardFavorite;
