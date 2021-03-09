import { Column, Entity, OneToOne, RelationId } from 'typeorm';
import { User } from './user.entity';
import { CoreEntity } from 'src/entities/core/core.entity';

@Entity()
export class Role extends CoreEntity {
  @Column('enum', {
    name: 'category',
    enum: ['Inhyuk', 'admin', 'developer', 'artist'],
  })
  category: 'Inhyuk' | 'admin' | 'developer' | 'artist';

  @OneToOne(() => User, (user) => user.role, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;
  @RelationId((role: Role) => role.user)
  userId: string;
}
