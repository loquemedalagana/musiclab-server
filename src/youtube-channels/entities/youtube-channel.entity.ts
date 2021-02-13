import { Column, OneToMany } from 'typeorm';
import { YoutubeEntity } from 'src/youtube/entities/youtube.entity';
import { YoutubeVideo } from 'src/youtube-videos/entities/youtube-video.entity';

export enum YoutubeChannelCategory {
  OFFICIAL = 'official',
  FAN = 'fan',
  MUSICIAN = 'musician',
  ETC = 'etc',
}

export class YoutubeChannel extends YoutubeEntity {
  @Column({ type: 'enum', enum: YoutubeChannelCategory, nullable: false })
  category: YoutubeChannelCategory;

  @Column({ nullable: false })
  playlistId: string;

  @OneToMany(() => YoutubeVideo, (video) => video.channel)
  videos: YoutubeVideo[];
}
