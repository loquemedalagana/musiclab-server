import {
  AbstractRepository,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { YoutubeEntity } from 'src/youtube/entities/youtube.entity';
import { YoutubeChannel } from 'src/youtube-channels/entities/youtube-channel.entity';
import { Tag } from 'src/tags/entities/tag.entity';

// changed to axios
import { getChannelVideoList } from 'src/youtube/lib/endpoints';
import { YoutubeThumbnailImage } from 'src/youtube/types/thumbnail';

export type DownLoadedYoutubeVideoData = {
  videoId: string;
  publishedAt: Date | string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YoutubeThumbnailImage;
  channelTitle: string;
  tags?: Array<string>;
  newTags?: Array<string>;
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage?: string;
  defaultLanguage?: string;
};

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

export const getVideoDataFromPlaylistId = (data) =>
  data
    ? data.items.map(({ snippet, contentDetails }) => {
        return {
          id: contentDetails.videoId,
          ...snippet,
        };
      })
    : [];

export class YoutubeVideoRepository extends AbstractRepository<YoutubeVideo> {
  private async findOrCreate(
    downLoadedVideoData: any,
    category: string,
  ): Promise<YoutubeVideo> {
    let video = await this.manager.findOne(YoutubeVideo, {
      id: downLoadedVideoData?.contentDetails.videoId,
    });
    if (!video) {
      video = new YoutubeVideo();
    }

    return video;
  }

  addYoutubeVideoList(playlistId: string, category: string) {
    const responsedVideoList = getChannelVideoList(playlistId);
    // promise all return
  }
}
