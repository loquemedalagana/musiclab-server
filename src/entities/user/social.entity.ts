import { Column, Entity, OneToOne } from 'typeorm';
import { CoreEntity } from 'src/entities/core/core.entity';
import { User } from './user.entity';

@Entity()
export class Social extends CoreEntity {
  @Column('varchar', { nullable: true, length: 300 })
  twitter: string;

  @Column('varchar', { nullable: true, length: 300 })
  facebook: string;

  @Column('varchar', { nullable: true, length: 300 })
  youtube: string;

  @Column('varchar', { nullable: true, length: 300 })
  instagram: string;

  @Column('varchar', { nullable: true, length: 300 })
  blog: string;

  @Column('varchar', { nullable: true, length: 300 })
  soundcloud: string;
}
