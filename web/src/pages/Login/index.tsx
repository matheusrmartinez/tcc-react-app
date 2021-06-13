import "./styles.scss";

import React from "react";
import { useForm } from "react-hook-form";
import { Profile } from "../../interfaces/profile";
import { login } from '../../util/auth';

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<Profile>();

  const onSubmit = handleSubmit(async (data) => {
    const isSuccess = await login(data)

    if (isSuccess) {
      window.location.href = '/home'
    }
  });

  const handleNagigateToLogin = () => {
    window.location.href = '/user-registration'
  }

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="login">Entrar</div>
          <div onClick={handleNagigateToLogin} className="login">Registrar-se</div>

          <form onSubmit={onSubmit} className="login-form">
            <input
              id='email'
              type="text"
              name='email'
              placeholder="Informe o Email"
              className="input"
              ref={register({ required: true })}
            />
            {
              errors.email && <div style={{ fontSize: 10 }} className="error"> Coloque seu nome </div>
            }
            <input id='password' name='password' type="password" placeholder="Senha" className="input" ref={register({ required: true })} />
            {
              errors.password && <div style={{ fontSize: 10 }} className="error"> Coloque seu nome </div>
            }
            <button type='submit' className="btn">Entrar</button>
            <span>
              <a href="#">Esqueci minha senha ou usuário. </a>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default React.memo(Login);
