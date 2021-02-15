import { Column, PrimaryColumn } from 'typeorm';
import { Length } from 'class-validator';
import { YoutubeThumbnailImage } from 'src/youtube/types/thumbnail';

export enum YoutubeCategory {
  OFFICIAL = 'official',
  INHYUK = 'Inhyuk',
  FAN = 'fan',
  MUSICIAN = 'musician',
  COVER = 'cover',
  ETC = 'etc',
}

export abstract class YoutubeEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  @Length(10, 30)
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  publishedAt: Date;

  @Column({ type: 'enum', enum: YoutubeCategory })
  category: YoutubeCategory;

  @Column({ type: 'json' })
  thumbnails: YoutubeThumbnailImage;
}
