import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { YoutubeCoreEntity } from 'src/entities/core/youtube.core.entity';
import { YoutubeVideo } from 'src/entities/youtube/youtube-video.entity';
import { Notification } from 'src/entities/notification/notification.entity';

@Entity()
export class YoutubeChannel extends YoutubeCoreEntity {
  @Column({ type: 'varchar', length: 30 })
  playlistId: string;

  @OneToMany(() => YoutubeVideo, (video) => video.channel)
  videos: YoutubeVideo[];

  /*
  @OneToOne(() => Notification, (notification) => notification.youtube_channel)
  notification: Notification;
  * */
}
