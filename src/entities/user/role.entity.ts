import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AbstractRepository,
  OneToOne,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

export class RoleRepository extends AbstractRepository<Role> {
  // 운영자인지 확인, 아니면 권한 없음 리턴
}
