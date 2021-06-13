import { Router } from 'express';

import CreateAnimalService from '../../../services/CreateAnimalService';
import AnimalRepository from '../../typeorm/repositories/AnimalRepository';

const animalsRouter = Router();

animalsRouter.post('/', async (request, response) => {
  const { image, popular_name, scientific_name, specie, user } = request.body;

  const animalRepository = new AnimalRepository();
  const createAnimal = new CreateAnimalService(animalRepository);

  const animal = await createAnimal.execute({
    popular_name,
    scientific_name,
    image,
    specie,
    user,
  });

  return response.json(animal);
});

animalsRouter.get('/', async (request, response) => {
  const animalRepository = new AnimalRepository();
  const animals = await animalRepository.findAll();

  return response.json(animals);
});

export default animalsRouter;
