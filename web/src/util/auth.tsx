import loginActions from '../../src/actions/loginActions'
import { Profile } from '../interfaces/profile';

const isLogged = async () => await !!localStorage.getItem('token')

const login = async ({email, password}: Profile) => {
  try {
    const token = await loginActions.login({email, password});

    if (token) {
      localStorage.setItem('token', token)
    }

    return true;
  } catch (err) {
    console.log(err)
    return false;
  }
}

const logout = () => {
  localStorage.removeItem('token')
  window.location.href='/login'
}

export { isLogged, login, logout }
