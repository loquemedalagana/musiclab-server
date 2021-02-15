import {
  Column,
  ManyToMany,
  ManyToOne,
  RelationId,
  JoinTable,
  Entity,
  AbstractRepository,
} from 'typeorm';
import { YoutubeEntity } from 'src/youtube/entities/youtube.entity';
import { YoutubeChannel } from 'src/youtube-channels/entities/youtube-channel.entity';
import { Tag } from 'src/tags/entities/tag.entity';

// changed to axios
import { getChannelVideoList } from '../../youtube/lib/endpoints';

@Entity()
export class YoutubeVideo extends YoutubeEntity {
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

export class YoutubeVideoRepository extends AbstractRepository<YoutubeVideo> {
  // find or create

  addYoutubeVideoList(playlistId: string, category: string) {
    const responsedVideoList = getChannelVideoList(playlistId);
  }
}
