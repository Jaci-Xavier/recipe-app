import PropTypes from 'prop-types';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginProvider';
import '../Style/login.css';
import logo from '../Style/logo.png';

function Login({ history }) {
  const { login, setLogin } = useContext(LoginContext);

  const isValid = login.email.includes('@')
    && login.email.includes('.com') && login.password.length > login.magicNumber;

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push('/meals');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        className="flex-col h-2/6 justify-around bg-slate-50 bg-opacity-60 border-2
      border-gray-500 rounded-lg flex p-3"
      >
        <h2 className="text-2xl text-center">Login</h2>
        <label>
          <input
            className="text-center border-2 border-gray-400 rounded-md h-9"
            type="text"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ (e) => setLogin({ ...login, email: e.target.value }) }
          />
        </label>
        <label>
          <input
            className="text-center border-2 border-gray-400 rounded-md h-9"
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ (e) => setLogin({ ...login, password: e.target.value }) }
          />
        </label>
        <button
          className="disabled:bg-orange-300 bg-orange-500
           hover:bg-green-500 rounded-md h-8"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isValid }
          onClick={ handleClick }
        >
          Enviar
        </button>
      </form>
      <img
        className="w-3/5 bg-slate-50 bg-opacity-10 rounded-xl"
        src={ logo }
        alt="logo"
      />
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
