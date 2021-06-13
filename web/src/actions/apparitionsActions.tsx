import { apparitionsService } from '../constants/endpoint';
import axios from 'axios';

class Apparitions {
  async getApparitions(): Promise<any> {
    const url = `${apparitionsService}/approved`;

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
      alert('Error ao buscar aparições. ')
      return [];
    }
  }

  async getApparitionsPending(): Promise<any> {
    const url = `${apparitionsService}`;

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
      alert('Error ao buscar aparições pendentes. ')
    }
  }

  async postApparitions(data: any): Promise<any> {
    const url = `${apparitionsService}`;

    try {
      const response = await axios.post(url, data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      alert('Aparição cadastrada com sucesso. ');
      window.location.href='/apparition-record'
    } catch (err) {
      console.log(err);
      alert('Error ao cadastrar aparição. ');
      return [];
    }
  }

  async approveApparitions(data: any): Promise<any> {
    const url = `${apparitionsService}/approvation/true`;

    try {
      const response = await axios.patch(url, data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      alert('Aparição aprovada com sucesso. ');
      window.location.href='/apparition-pendent-list'
    } catch (err) {
      console.log(err);
      alert('Error ao aprovar aparição. ');
      return [];
    }
  }
}

export default new Apparitions();