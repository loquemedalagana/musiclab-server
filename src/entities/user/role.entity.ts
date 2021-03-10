import { Column, Entity, OneToOne, RelationId } from 'typeorm';
import { User } from './user.entity';
import { CoreEntity } from 'src/entities/core/core.entity';

export enum RoleCategory {
  Inhyuk = 'Inhyuk',
  Artist = 'Artist',
  Developer = 'Developer',
  Admin = 'Admin',
}

@Entity()
export class Role extends CoreEntity {
  @Column('enum', {
    name: 'category',
    enum: RoleCategory,
  })
  category: RoleCategory;

  @OneToOne(() => User, (user) => user.role)
  user: User;

  @RelationId((role: Role) => role.user)
  userId: string;
}
