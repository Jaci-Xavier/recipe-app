import PropTypes from 'prop-types';
import RecipesMealsOrDrinks from '../components/RecipesMealsOrDrinks';
import ButtonsFilterCategories from '../components/ButtonsFilterCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipes({ history }) {
  const { pathname } = history.location;
  const typeRecipe = pathname === '/meals' ? 'Meal' : 'Drink';
  return (
    <main className="relative">
      <Header title={ `${typeRecipe}s` } searchBool />
      <ButtonsFilterCategories history={ history } />
      <RecipesMealsOrDrinks history={ history } />
      <Footer history={ history } />
    </main>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired }).isRequired,
};
export default Recipes;
