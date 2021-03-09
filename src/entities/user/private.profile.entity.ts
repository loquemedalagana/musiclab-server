import {
  Column,
  Entity,
  OneToOne,
  AbstractRepository,
  RelationId,
} from 'typeorm';
import { CoreEntity } from 'src/entities/core/core.entity';
import { User } from './user.entity';

@Entity()
export class PrivateProfile extends CoreEntity {
  @Column()
  familyName: string;

  @Column()
  givenName: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column('enum', { name: 'gender', enum: ['male', 'female'] })
  gender: 'male' | 'female';

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;

  @RelationId((profile: PrivateProfile) => profile.user)
  userId: string;
}

export class ProfileRepository extends AbstractRepository<PrivateProfile> {}
