import AppError from '@shared/errors/AppError';
import Animal from '../infra/typeorm/entities/Animal';
import IAnimalRepository from '../repositories/IAnimalRepository';

interface IRequest {
  scientific_name: string;
  popular_name: string;
  image: string;
  specie: string;
  user: string;
}

class CreateAnimalService {
  constructor(private animalRepository: IAnimalRepository) {}

  public async execute({
    scientific_name,
    popular_name,
    image,
    specie,
    user,
  }: IRequest): Promise<Animal> {
    const animalIsRegistered = await this.animalRepository.findByPopularNameOrScientificName(
      popular_name,
      scientific_name,
    );

    if (animalIsRegistered !== undefined)
      throw new AppError(
        'Já existe um animal cadastrado com o nome popular ou nome científico informados',
        401,
      );

    const animal = await this.animalRepository.create({
      scientific_name,
      popular_name,
      image,
      specie,
      user,
    });

    return animal;
  }
}

export default CreateAnimalService;
