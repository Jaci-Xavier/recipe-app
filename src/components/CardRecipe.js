import PropTypes from 'prop-types';
import { useState } from 'react';
import copy from 'clipboard-copy';
import ShareButton from './buttons/shareButton';
import shareBtn from '../images/shareIcon.svg';

function CardRecipe({ recipe, index }) {
  const [copyLink, setCopyLink] = useState(false);

  const handleClickShareBtn = (type, id) => {
    const FIX = 2000;
    copy(`http://localhost:3000/${type}s/${id}`);
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
  );
}

CardRecipe.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
export default CardRecipe;
