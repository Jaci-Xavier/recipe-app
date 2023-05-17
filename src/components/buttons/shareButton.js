import PropTypes from 'prop-types';
import shareBtn from '../../images/shareIcon.svg';

function ShareButton({ testId, handleClickShareBtn }) {
  return (
    <div>
      <button
        type="button"
        src={ shareBtn }
        onClick={ handleClickShareBtn }
        data-testid={ testId }
      >
        <img
          src={ shareBtn }
          alt="Compartilhar Receita"
        />
      </button>
    </div>
  );
}
ShareButton.propTypes = {
  testId: PropTypes.string.isRequired,
  handleClickShareBtn: PropTypes.func.isRequired,
};
export default ShareButton;
