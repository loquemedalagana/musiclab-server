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
import { User } from 'src/entities/user/user.entity';
import { YoutubeChannel } from 'src/entities/youtube/youtube-channel.entity';
import { uuid } from 'aws-sdk/clients/customerprofiles';

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

  @ManyToOne(() => User, (user) => user.sent_notifications, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  sender: User;

  @RelationId((notification: Notification) => notification.sender)
  senderId: string;

  @ManyToOne(() => User, (user) => user.received_notifications, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  receiver: User;

  @RelationId((notification: Notification) => notification.receiver)
  receiverId: string;

  // one to one
  @OneToOne(
    () => YoutubeChannel,
    (youtube_channel) => youtube_channel.notification,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  )
  youtube_channel: YoutubeChannel;
}

export class NotificationRepository extends AbstractRepository<Notification> {
  // 알림 만들기 (이메일로 전달)
  // 삭제 혹은 읽음 처리
}
