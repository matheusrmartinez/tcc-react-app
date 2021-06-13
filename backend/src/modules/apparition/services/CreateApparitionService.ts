// import uploadConfig from '@config/upload';
// import path from 'path';
// import fs from 'fs';
import Apparition from '../infra/typeorm/entities/Apparition';
import IApparitionRepository from '../repositories/IApparitionRepository';

interface IRequest {
  latitude: number;
  longitude: number;
  image: string;
  animal_id: any;
  specie_id: string;
  user: string;
  name: string;
  address: string;
}

class CreateApparitionService {
  constructor(private aparicoesRepository: IApparitionRepository) {}

  public async execute({
    latitude,
    longitude,
    image,
    user,
    name,
    address,
  }: IRequest): Promise<Apparition> {
    const apparition = await this.aparicoesRepository.create({
      latitude,
      longitude,
      image,
      animal_id: null,
      specie_id: '',
      user,
      approved: false,
      name,
      address,
    });

    return apparition;
  }
}

export default CreateApparitionService;
