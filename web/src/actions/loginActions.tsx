import { loginService, createUserService } from '../constants/endpoint';
import { Profile } from '../interfaces/profile';
import axios from 'axios';

class user {
  async createUser(data: Profile): Promise<any> {
    const url = `${createUserService}`;

    try {
      const response = await axios.post(url,
        data ,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return true;
    } catch (err) {
      console.log(err)
      alert('Error ao tentar criar usuário. ')
      return false;
    }
  }

  async login(data: Profile): Promise<any> {
    const url = `${loginService}`;

    try {
      const response = await axios.post(url,
        data ,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.token;
    } catch (err) {
      console.log(err)
      alert('Erro ao tentar fazer login no sistema. ')
      return false;
    }
  }
}

export default new user();