// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import iconMeal from '../images/mealIcon.svg';
import iconDrink from '../images/drinkIcon.svg';
import './Footer.css';
import { RecipesContext } from '../context/RecipesProvider';
import logo from '../Style/logo.png';
import { Link } from 'react-router-dom';

function Footer({ history }) {
  const { setPath } = useContext(RecipesContext);
  const handleClick = (link) => {
    setPath(link);
    history.push(link);
  };
  return (
    <section
      className="fixed bottom-0 w-full flex justify-around bg-slate-200/50"
      data-testid="footer"
    >
      <button
        onClick={ () => handleClick('/meals') }
      >
        <img
          className="hover:scale-125 duration-300 hover:p-1"
          src={ iconMeal }
          alt="iconMeal"
          data-testid="meals-bottom-btn"
        />
      </button>
      <Link to="/favorite-recipes">
        <img
          className="w-50 h-10"
          src={ logo }
          alt="logo"
        />
      </Link>
      <button
        onClick={ () => handleClick('/drinks') }
      >
        <img
          className="hover:scale-125 duration-300 hover:p-1"
          src={ iconDrink }
          alt="iconMeal"
          data-testid="drinks-bottom-btn"
        />
      </button>
    </section>
  );
}
Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Footer;
