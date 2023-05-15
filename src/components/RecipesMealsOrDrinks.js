import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesProvider';

function RecipesMealsOrDrinks({ history }) {
  const { pathname } = history.location;
  const { listRecipes } = useContext(RecipesContext);
  const typeRecipe = pathname === '/meals' ? 'Meal' : 'Drink';

  return (
    <section
      className="h-screen"
    >
      { listRecipes && listRecipes.map((recipe, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <Link to={ `${pathname}/${recipe[`id${typeRecipe}`]}` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe[`str${typeRecipe}Thumb`] }
              alt={ recipe[`str${typeRecipe}`] }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { recipe[`str${typeRecipe}`] }
            </p>
          </Link>
        </div>
      ))}
    </section>
  );
}

RecipesMealsOrDrinks.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default RecipesMealsOrDrinks;
