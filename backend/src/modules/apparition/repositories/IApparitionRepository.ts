import Apparition from '../infra/typeorm/entities/Apparition';
import ICreateApparitionDTO from '../dtos/ICreateApparitionDTO';

export default interface IApparitionRepository {
  findAllNotApproved(): Promise<Apparition[]>;
  findById(id: string): Promise<Apparition | undefined>;
  create(data: ICreateApparitionDTO): Promise<Apparition>;
  save(apparition: Apparition): Promise<Apparition>;
}
