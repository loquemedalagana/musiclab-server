import { Column, Entity, OneToOne, RelationId } from 'typeorm';
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

  @OneToOne(() => User, (user) => user.private_profile, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;

  @RelationId((private_profile: PrivateProfile) => private_profile.user)
  userId: string;
}
