import {
  Column,
  ManyToMany,
  ManyToOne,
  RelationId,
  JoinTable,
  Entity,
} from 'typeorm';
import { YoutubeEntity } from 'src/youtube/entities/youtube.entity';
import { YoutubeChannel } from 'src/youtube-channels/entities/youtube-channel.entity';
import { Tag } from 'src/tags/entities/tag.entity';

export enum YoutubeVideoCategory {
  OFFICIAL = 'official',
  INHYUK = 'Inhyuk',
  COVER = 'cover',
  ETC = 'etc',
}

// 악기 추가하기

@Entity()
export class YoutubeVideo extends YoutubeEntity {
  @Column({ type: 'enum', enum: YoutubeVideoCategory, default: 'Inhyuk' })
  category: YoutubeVideoCategory;

  @Column({ type: 'int', default: 0 })
  visitedCount: number;

  @ManyToOne(() => YoutubeChannel, (channel) => channel.videos)
  channel: YoutubeChannel;

  @RelationId((video: YoutubeVideo) => video.channel)
  channelId: string;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
