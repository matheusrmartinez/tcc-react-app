import Animal from '../infra/typeorm/entities/Animal';
import ICreateAnimalDTO from '../dtos/ICreateAnimalDTO';

export default interface IAnimalRepository {
  create(data: ICreateAnimalDTO): Promise<Animal>;
  findByPopularNameOrScientificName(
    popular_name: string,
    scientific_name: string,
  ): Promise<Animal | undefined>;
}
