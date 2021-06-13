import Apparition from '../infra/typeorm/entities/Apparition';
import IApparitionRepository from '../repositories/IApparitionRepository';

interface IRequest {
  id: string;
  animal_id: any;
  specie_id: string;
  approved: boolean;
  pending_analysis: boolean;
  popular_name: string;
  scientific_name: string;
}

class UpdateApparitionService {
  constructor(private apparitionRepository: IApparitionRepository) {}

  public async execute({
    id,
    animal_id,
    specie_id,
    approved,
    popular_name,
    scientific_name,
  }: IRequest): Promise<Apparition | undefined> {
    const apparition = await this.apparitionRepository.findById(id);

    if (apparition) {
      apparition.animal_id = animal_id;
      apparition.popular_name = popular_name;
      apparition.scientific_name = scientific_name;
      apparition.specie_id = specie_id;
      apparition.approved = approved;
      apparition.pending_analysis = false;

      await this.apparitionRepository.save(apparition);
    }

    return apparition;
  }
}

export default UpdateApparitionService;
