import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';
import { YoutubeThumbnailImage } from '../types/thumbnail';

export abstract class YoutubeEntity {
  @PrimaryGeneratedColumn()
  @Length(10, 25)
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  publishedAt: Date;

  @Column({ type: 'json' })
  thumbnails: YoutubeThumbnailImage;
}
