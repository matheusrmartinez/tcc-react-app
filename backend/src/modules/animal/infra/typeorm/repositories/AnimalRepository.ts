import { getRepository, Like, Repository } from 'typeorm';

import ICreateAnimalDTO from '@modules/animal/dtos/ICreateAnimalDTO';
import IAnimalRepository from '@modules/animal/repositories/IAnimalRepository';

import Animal from '../entities/Animal';

class AnimalRepository implements IAnimalRepository {
  private ormRepository: Repository<Animal>;

  constructor() {
    this.ormRepository = getRepository(Animal);
  }

  public async findById(id: string): Promise<Animal | undefined> {
    const apparition = await this.ormRepository.findOne(id);

    return apparition;
  }

  public async findAll(): Promise<Animal[]> {
    const animals = await this.ormRepository.find();

    return animals || null;
  }

  public async findByPopularNameOrScientificName(
    popular_name: string,
    scientific_name: string,
  ): Promise<Animal | undefined> {
    const animal = await getRepository(Animal)
      .createQueryBuilder('animals')
      .where(`animals.popular_name = '${popular_name}'`)
      .orWhere(`animals.scientific_name = '${scientific_name}'`)
      .getOne();

    return animal || undefined;
  }

  public async create(animalData: ICreateAnimalDTO): Promise<Animal> {
    const animal = this.ormRepository.create(animalData);

    await this.ormRepository.save(animal);

    return animal;
  }

  public async save(animal: Animal): Promise<Animal> {
    return this.ormRepository.save(animal);
  }
}

export default AnimalRepository;
