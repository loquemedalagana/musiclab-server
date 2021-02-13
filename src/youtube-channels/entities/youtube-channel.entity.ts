import { Column, Entity, OneToMany } from 'typeorm';
import { YoutubeEntity } from 'src/youtube/entities/youtube.entity';
import { YoutubeVideo } from 'src/youtube-videos/entities/youtube-video.entity';

export enum YoutubeChannelCategory {
  OFFICIAL = 'official',
  FAN = 'fan',
  MUSICIAN = 'musician',
  ETC = 'etc',
}

@Entity()
export class YoutubeChannel extends YoutubeEntity {
  @Column({ type: 'enum', enum: YoutubeChannelCategory, nullable: false })
  category: YoutubeChannelCategory;

  @Column({ type: 'varchar', length: 20 })
  playlistId: string;

  @OneToMany(() => YoutubeVideo, (video) => video.channel)
  videos: YoutubeVideo[];
}
