import { Column, ManyToMany, ManyToOne, RelationId } from 'typeorm';
import { JoinTable } from 'typeorm/browser';
import { YoutubeEntity } from '../../youtube/entities/youtube.entity';
import { YoutubeChannel } from '../../youtube-channels/entities/youtube-channel.entity';
import { Tag } from '../../tags/entities/tag.entity';

export enum YoutubeVideoCategory {
  OFFICIAL = 'official',
  INHYUK = 'Inhyuk',
  COVER = 'cover',
  ETC = 'etc',
}

// 악기 추가하기

export class YoutubeVideo extends YoutubeEntity {
  @Column({ type: 'enum', enum: YoutubeVideoCategory, default: 'Inhyuk' })
  category: YoutubeVideoCategory;

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
