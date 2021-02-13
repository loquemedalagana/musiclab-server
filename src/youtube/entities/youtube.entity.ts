import { Column, PrimaryColumn } from 'typeorm';
import { Length } from 'class-validator';
import { YoutubeThumbnailImage } from 'src/youtube/types/thumbnail';

export abstract class YoutubeEntity {
  @PrimaryColumn()
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
