import { getRepository, Repository } from 'typeorm';
import ICreateApparitionDTO from '@modules/apparition/dtos/ICreateApparitionDTO';
import IApparitionRepository from '@modules/apparition/repositories/IApparitionRepository';
import * as lodash from 'lodash';
import Apparition from '../entities/Apparition';

class ApparitionRepository implements IApparitionRepository {
  private ormRepository: Repository<Apparition>;

  constructor() {
    this.ormRepository = getRepository(Apparition);
  }

  public async findAllNotApproved(): Promise<Apparition[]> {
    const apparitionsNotApproved = await this.ormRepository.find({
      where: {
        approved: false,
        pending_analysis: true,
      },
    });

    return apparitionsNotApproved || null;
  }

  public async findAllApproved(): Promise<Apparition[]> {
    const apparitionsApproved = await this.ormRepository.find({
      where: { approved: true, pending_analysis: false },
    });

    const apparitionsApprovedAgrouped = lodash.groupBy(
      apparitionsApproved,
      'popular_name',
    );

    let apparitionsArray: Apparition[] = [];

    Object.entries(apparitionsApprovedAgrouped).forEach(
      ([popular_name, apparitions]) => {
        apparitionsArray = [...apparitionsArray, apparitions[0]];
      },
    );
    return apparitionsArray || null;
  }

  public async findBySpecieId(specie_id: string): Promise<Apparition[]> {
    let apparitions = null;

    if (specie_id === 'Todos') {
      apparitions = await this.ormRepository.find({
        where: { approved: true, pending_analysis: false },
      });
    } else {
      apparitions = await this.ormRepository.find({
        where: { approved: true, pending_analysis: false, specie_id },
      });
    }

    return apparitions || null;
  }

  public async findById(id: string): Promise<Apparition | undefined> {
    const apparition = await this.ormRepository.findOne(id);

    return apparition || undefined;
  }

  public async create(
    ApparitionData: ICreateApparitionDTO,
  ): Promise<Apparition> {
    const apparition = this.ormRepository.create(ApparitionData);

    await this.ormRepository.save(apparition);

    return apparition;
  }

  public async save(ApparitionData: Apparition): Promise<Apparition> {
    return this.ormRepository.save(ApparitionData);
  }
}

export default ApparitionRepository;
