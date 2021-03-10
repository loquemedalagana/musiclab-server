import {
  Entity,
  PrimaryGeneratedColumn,
  AbstractRepository,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  RelationId,
} from 'typeorm';

// user와 1:N

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  readAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // relations
}

export class NotificationRepository extends AbstractRepository<Notification> {
  // 알림 만들기 (이메일로 전달)
  // 삭제 혹은 읽음 처리
}
