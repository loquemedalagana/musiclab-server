import {
  Entity,
  PrimaryGeneratedColumn,
  AbstractRepository,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';

// user와 1:N

@Entity()
export class Notification extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  publishedAt: Date;
}

export class NotificationRepository extends AbstractRepository<Notification> {
  // 알림 만들기
  // 삭제 혹은 읽음 처리
}
