import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';
import { YoutubeVideo } from '../../youtube-videos/entities/youtube-video.entity';
import { YoutubeThumbnailImage } from '../../youtube/types/thumbnail';

export enum YoutubeChannelCategory {
  OFFICIAL = 'official',
  FAN = 'fan',
  MUSICIAN = 'musician',
  ETC = 'etc',
}

export class YoutubeChannel {
  @PrimaryGeneratedColumn()
  @Length(0, 25)
  id: string;

  @Column({ type: 'enum', enum: YoutubeChannelCategory, nullable: false })
  category: YoutubeChannelCategory;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  playlistId: string;

  @Column({ type: 'simple-json' })
  thumbnails: YoutubeThumbnailImage;

  @OneToMany(() => YoutubeVideo, (video) => video.channel)
  videos: YoutubeVideo[];
}
