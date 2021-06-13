import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Animal from '@modules/animal/infra/typeorm/entities/Animal';

@Entity('apparitions')
class Apparition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  image: string;

  @Column()
  approved: boolean;

  @Column()
  pending_analysis: boolean;

  @ManyToOne(() => Animal)
  @JoinColumn({ name: 'animal_id' })
  animal_id: Animal;

  @Column()
  specie_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  name: string;

  @Column()
  popular_name: string;

  @Column()
  scientific_name: string;

  @Column()
  address: string;
}

export default Apparition;
