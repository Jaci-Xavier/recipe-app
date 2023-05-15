import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import searchIcon from '../images/searchIcon.svg';
import { RecipesContext } from '../context/RecipesProvider';
import { fetchRecipeByType } from '../services/fetchRecipiesByCategory';

function SearchBar() {
  const [open, setOpen] = useState(false);
  const [radioV, setRadioV] = useState('');
  const [parameter, setParameter] = useState('');
  const { path, setListRecipes } = useContext(RecipesContext);
  const history = useHistory();

  const check = (arr) => {
    if (arr) {
      if (arr.length === 1) {
        const id = path === '/meals'
          ? `${path}/${arr[0].idMeal}` : `${path}/${arr[0].idDrink}`;
        history.push(`${id}`);
      }
      const finalNUmber = 12;
      return setListRecipes(arr.slice(0, finalNUmber));
    }
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  async function handleClickExec(radio, param) {
    if (radio === 'fl') {
      if (param.length === 1) {
        await fetchRecipeByType('f', param, 'search', path.slice(1)).then((ite) => {
          check(ite);
        });
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      return;
    }
    switch (radio) {
    case 'ing':
      await fetchRecipeByType('i', param, 'filter', path.slice(1)).then((item) => {
        check(item);
      });
      break;
    default:
      await fetchRecipeByType('s', param, 'search', path.slice(1)).then((item) => {
        check(item);
      });
      break;
    }
  }

  return (
    <div>
      {!open && (
        <button onClick={ () => (!open ? setOpen(true) : setOpen(false)) }>
          <img
            src={ searchIcon }
            alt="icone para realizar pesquisa"
            data-testid="search-top-btn"
          />
        </button>
      )}
      { open && (
        <div className="">
          <input
            className="text-center border-2 border-gray-400 rounded-md h-9"
            type="text"
            data-testid="search-input"
            onChange={ (e) => {
              setParameter(e.target.value);
            } }
          />
          <button
            className="m-1 p-1 bg-orange-500 hover:bg-green-500 rounded-md h-8"
            data-testid="exec-search-btn"
            onClick={ () => {
              handleClickExec(radioV, parameter);
              setOpen(false);
            } }
          >
            Search
          </button>
          <div className="flex justify-evenly">
            <label
              className="flex items-center"
              htmlFor="ingredient-radio"
            >
              <input
                name="radio"
                type="radio"
                data-testid="ingredient-search-radio"
                id="ingredient-radio"
                onClick={ () => {
                  setRadioV('ing');
                } }
              />
              Ingredient

            </label>

            <label htmlFor="name-radio">
              <input
                name="radio"
                type="radio"
                data-testid="name-search-radio"
                id="name-radio"
                onClick={ () => {
                  setRadioV('name');
                } }
              />
              Name

            </label>

            <label htmlFor="first-leter-radio">
              <input
                name="radio"
                type="radio"
                data-testid="first-letter-search-radio"
                id="first-leter-radio"
                onClick={ () => {
                  setRadioV('fl');
                } }
              />
              First-letter

            </label>

          </div>
        </div>
      ) }
    </div>
  );
}

export default SearchBar;
