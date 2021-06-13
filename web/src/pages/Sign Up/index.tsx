import "./styles.scss";

import React from "react";
import { useForm } from "react-hook-form";
import { Profile } from "../../interfaces/profile";
import user  from '../../actions/loginActions';

const SignUp: React.FC = () => {
  const {register, handleSubmit, errors} = useForm<Profile>();

  const onSubmit =  handleSubmit(async (data) => {
    const isCreatedUser = await user.createUser(data);

    if (isCreatedUser) {
      window.location.href='/login'
    }
  });

  const handleNagigateToLogin = () => {
    window.location.href='/login'
  }

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="signup">Registrar-se</div>
          <div onClick={handleNagigateToLogin} className="login">Entrar</div>

          <form onSubmit={onSubmit} className="signup-form" >
            <input
              id='name'
              name='name'
              type="text"
              placeholder="Digite o seu nome"
              className="input"
              ref={register({required: true})}
            />
            {
              errors.name && <div style={{fontSize: 10}} className="error"> Coloque seu nome </div>
            }
            <input
              id='email'
              name='email'
              type="text"
              placeholder="Digite seu Email"
              className="input"
              ref={register({required: true})}
            />
            {
              errors.email && <div style={{fontSize: 10}} className="error"> Coloque seu Email </div>
            }
            <br />
            <input
              id='password'
              name='password'
              type="text"
              placeholder="Escolha sua senha"
              className="input"
              ref={register({required: true})}
            />
            {
              errors.password && <div style={{fontSize: 10}} className="error"> Coloque sua senha </div>
            }
            <br />
            <br />
            <button type="submit" className="btn">Criar Conta</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default React.memo(SignUp);
