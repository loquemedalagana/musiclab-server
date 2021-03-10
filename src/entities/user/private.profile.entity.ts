import { Column, Entity, OneToOne, RelationId } from 'typeorm';
import { CoreEntity } from 'src/entities/core/core.entity';
import { User } from './user.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
export class PrivateProfile extends CoreEntity {
  @Column()
  familyName: string;

  @Column()
  givenName: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @OneToOne(() => User, (user) => user.private_profile, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;

  @RelationId((private_profile: PrivateProfile) => private_profile.user)
  userId: string;
}