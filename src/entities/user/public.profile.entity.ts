import { Column, Entity, OneToOne, RelationId } from 'typeorm';
import { CoreEntity } from 'src/entities/core/core.entity';
import { User } from './user.entity';

@Entity()
export class PublicProfile extends CoreEntity {
  @Column('varchar', { length: 15, default: 'en' })
  locale: string;

  @Column('int', { default: -1 })
  points: number;

  @Column('varchar', { nullable: true, length: 300 })
  image: string;

  @Column('varchar', { nullable: true, length: 300 })
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToOne(() => User, (user) => user.public_profile)
  user: User;

  @RelationId((public_profile: PublicProfile) => public_profile.user)
  userId: string;
}
