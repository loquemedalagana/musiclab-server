import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AbstractRepository,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { name: 'category', enum: ['Inhyuk', 'admin', 'developer'] })
  category: 'Inhyuk' | 'admin' | 'developer';

  @OneToOne(() => User, (user) => user.role, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;
}

export class RoleRepository extends AbstractRepository<Role> {
  // 운영자인지 확인, 아니면 권한 없음 리턴
}
