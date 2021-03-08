import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  AbstractRepository,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  familyName: string;

  @Column()
  givenName: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;
}

export class ProfileRepository extends AbstractRepository<Profile> {}
