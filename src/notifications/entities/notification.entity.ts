import {
  Entity,
  PrimaryGeneratedColumn,
  AbstractRepository,
  Column,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity()
export class Notification {
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
