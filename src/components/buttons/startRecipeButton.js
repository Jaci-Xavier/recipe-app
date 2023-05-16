import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function StartRecipeButton() {
  const history = useHistory();
  const [InProgress, setInProgress] = useState(false);
  const [DoneRecipes, setDoneRecipes] = useState(false);
  const idPath = history.location.pathname.split('/')[2];
  const typePath = history.location.pathname.split('/')[1];

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const isInProgress = inProgressRecipe[typePath]
        ? Object.keys(inProgressRecipe[typePath]).some((id) => id === idPath) : false;
      setInProgress(isInProgress);
    }
  }, [idPath, typePath]);

  useEffect(() => {
    const wasDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const MadeRecipes = wasDoneRecipes
      .some((done) => done.id === idPath);
    setDoneRecipes(MadeRecipes);
  }, [idPath]);

  if (!DoneRecipes) {
    return (
      <button
        className=" border-lime-600 border-4 bg-lime-500
        hover:scale-150 duration-300 w-full"
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: 0 } }
        onClick={ () => history.push(`/${typePath}/${idPath}/in-progress`) }
        src={ InProgress ? 'Continue Recipe' : 'Start Recipe' }
      >
        {InProgress ? 'Continue' : 'Start'}
      </button>
    );
  } return null;
}
export default StartRecipeButton;
