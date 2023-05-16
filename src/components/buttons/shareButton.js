import PropTypes from 'prop-types';
// import { useState } from 'react';
// import copy from 'clipboard-copy';
import shareBtn from '../../images/shareIcon.svg';

function ShareButton({ testId, handleClickShareBtn }) {
  return (
    <div>
      <button
        className="hover:bg-sky-600 rounded hover:scale-125 duration-500"
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
