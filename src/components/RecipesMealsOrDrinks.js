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
      className="mt-40 h-screen flex flex-wrap gap-5 p-2 w-full justify-center mb-96 "
    >
      { listRecipes && listRecipes.map((recipe, index) => (
        <div
          className="hover:scale-105
        bg-slate-200/50 border-red-400 m-2 h-48 w-50 text-center"
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <Link to={ `${pathname}/${recipe[`id${typeRecipe}`]}` }>
            <img
              className="w-40 h-50 "
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
