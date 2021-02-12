import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { YoutubeThumbnailImage } from '../../youtube/types/thumbnail';

export enum YoutubeVideoCategory {
  OFFICIAL = 'official',
  INHYUK = 'Inhyuk',
  COVER = 'cover',
  ETC = 'etc',
}

// 악기 추가하기

export class YoutubeVideo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: YoutubeVideoCategory, default: 'Inhyuk' })
  category: YoutubeVideoCategory;

  @Column({ type: 'simple-json' })
  thumbnails: YoutubeThumbnailImage;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'date' })
  publishedAt: Date;

  @Column({ type: 'int' })
  visitedCount: number;
}
