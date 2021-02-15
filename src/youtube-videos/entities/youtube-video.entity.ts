import {
  AbstractRepository,
  EntityRepository,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import {
  YoutubeCategory,
  YoutubeEntity,
} from 'src/youtube/entities/youtube.entity';
import { YoutubeChannel } from 'src/youtube-channels/entities/youtube-channel.entity';
import { Tag, TagRepository } from 'src/tags/entities/tag.entity';

// changed to axios
import { getChannelVideoList } from 'src/youtube/lib/endpoints';
import { YoutubeThumbnailImage } from 'src/youtube/types/thumbnail';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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

@EntityRepository(YoutubeVideo)
export class SaveYoutubeVideoRepository extends AbstractRepository<YoutubeVideo> {
  private async findOrCreate(
    downLoadedVideoData: any,
    category: YoutubeCategory,
    tagRepository: TagRepository,
  ): Promise<YoutubeVideo> {
    let video = await this.manager.findOne(YoutubeVideo, {
      id: downLoadedVideoData?.contentDetails.videoId,
    });
    if (!video) {
      video = new YoutubeVideo();
      video.category = category;
      video.id = downLoadedVideoData.contentDetails.videoId;
      video.title = downLoadedVideoData.snippet.title;
      video.description = downLoadedVideoData.snippet.description;
      video.publishedAt = downLoadedVideoData.snippet.publishedAt;
      video.thumbnails = downLoadedVideoData.snippet.thumbnails;
      video.channelId = downLoadedVideoData.snippet.channelId;

      // tags!!! TagRepository 객체 불러오기!
      video.tags = await tagRepository.addTags(
        video.title,
        category === 'official',
      );
      console.log(video);

      await this.manager.save(video);
    }

    return video;
  }

  addYoutubeVideoList(
    playlistId: string,
    category: YoutubeCategory,
    tagRepository: TagRepository,
  ): Promise<YoutubeVideo[]> {
    // 이 부분 axios로 대체
    const responsedVideoList = getChannelVideoList(playlistId)?.items;

    if (!responsedVideoList) {
      throw new NotFoundException(`this channel doesn't contain video list!`);
    }

    // promise all return
    try {
      return Promise.all<YoutubeVideo>(
        responsedVideoList.map((videoData) =>
          this.findOrCreate(videoData, category, tagRepository),
        ),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'failed to add videos from playlistID',
      );
    }
  }
}
