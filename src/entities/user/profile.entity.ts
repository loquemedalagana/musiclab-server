import { Column, Entity, OneToOne, AbstractRepository } from 'typeorm';
import { PostCoreEntity } from 'src/entities/core/core.entity';
import { User } from './user.entity';

@Entity()
export class Profile extends PostCoreEntity {
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
}

export class ProfileRepository extends AbstractRepository<Profile> {}
