import { animalsService } from '../constants/endpoint';
import axios from 'axios';

class Animals {
  async getAnimals(): Promise<any> {
    const url = `${animalsService}`;

    try {
      const response = await axios.get(url,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (err) {
      console.log(err)
      alert('Error ao buscar catalog de animais. ')
      return [];
    }
  }

  async postAnimals(data: any): Promise<any> {
    const url = `${animalsService}`;

    try {
      const response = await axios.post(url, data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      alert('Animal cadastrado com sucesso. ')
      window.location.href='/animal-registration'
    } catch (err) {
      console.log(err)
      alert('Error ao cadastrar animal. ')
      return [];
    }
  }
}

export default new Animals();