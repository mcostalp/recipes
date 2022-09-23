import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

function Login() {
  // const history = useHistory();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  // function onHandleLogin() {
  //   setUser({ email });

  //   const setLoginRegister = () => {
  //     localStorage.setItem('mealsToken', 1);
  //     localStorage.setItem('cocktailsToken', 1);
  //   };
  //   setLoginRegister();

  //   history.push('/foods');
  // }

  function validationLogin(emailUser, senhaUser) {
    const EMAIL_VALI = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
    const MIN_PASSWORD = 6;
    return !(EMAIL_VALI.test(emailUser) && senhaUser.length > MIN_PASSWORD);
  }

  useEffect(() => {
    setBtnDisabled(validationLogin(email, senha));
  }, [email, senha]);

  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="text"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          id="senha"
          type="text"
          value={ senha }
          onChange={ ({ target: { value } }) => setSenha(value) }
          data-testid="password-input"
        />
      </label>

      <button
        className="btn"
        type="button"
        data-testid="login-submit-btn"
        disabled={ btnDisabled }
        // onClick={ onHandleLogin }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
