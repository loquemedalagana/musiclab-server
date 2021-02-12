import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { YoutubeThumbnailImage } from '../../youtube/types/thumbnail';

export enum YoutubeChannelCategory {
  OFFICIAL = 'official',
  FAN = 'fan',
  MUSICIAN = 'musician',
  ETC = 'etc',
}

export class YoutubeChannel {
  @PrimaryGeneratedColumn()
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
}
