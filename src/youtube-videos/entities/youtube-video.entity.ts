import {
  Column,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { JoinTable } from 'typeorm/browser';
import { Length } from 'class-validator';
import { YoutubeChannel } from '../../youtube-channels/entities/youtube-channel.entity';
import { Tag } from '../../tags/entities/tag.entity';
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
  @Length(0, 15)
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

  @ManyToOne(() => YoutubeChannel, (channel) => channel.videos)
  channel: YoutubeChannel;

  @RelationId((video: YoutubeVideo) => video.channel)
  channelId: string;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
