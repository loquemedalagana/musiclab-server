import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import axios from 'axios';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constants';
import { IYoutubeFetchOptions } from '../youtube/types/youtube';

// entities
import { YoutubeVideo } from './entities/youtube-video.entity';
import { TagRepository } from 'src/tags/entities/tag.entity';
import {
  YoutubeVideoInput,
  YoutubeVideoOutput,
} from './dtos/create-youtube-video.dto';

import { getEndpointFromVideoId } from 'src/youtube/lib/endpoints';

@Injectable()
export class YoutubeVideosService {
  constructor(
    @InjectRepository(YoutubeVideo)
    private readonly youtubeVideos: Repository<YoutubeVideo>,
    private readonly tagRepository: TagRepository,
    private readonly connection: Connection,
    @Inject(CONFIG_OPTIONS) private readonly options: IYoutubeFetchOptions,
  ) {}

  private getYoutubeVideoData(videoId: string): Promise<any> {
    const endpoint = getEndpointFromVideoId(
      videoId,
      this.options.youtubeApiKey,
    );
    return axios.get(endpoint);
  }

  async create(
    inputYoutubeVideoData: YoutubeVideoInput,
  ): Promise<YoutubeVideoOutput> {
    const response = await this.getYoutubeVideoData(
      inputYoutubeVideoData.videoId,
    );
    if (!response.data) {
      throw new BadRequestException('not found video data');
    }
    const fetchedVideoData = response.data;

    console.log(fetchedVideoData);
    try {
      const newVideo = new YoutubeVideo();
      const [videoRawData] = fetchedVideoData.items;

      newVideo.id = inputYoutubeVideoData.videoId;
      newVideo.category = inputYoutubeVideoData.category;
      newVideo.thumbnails = videoRawData.snippet.thumbnails;
      newVideo.title = videoRawData.snippet.title;
      newVideo.description = videoRawData.snippet.description;
      newVideo.publishedAt = videoRawData.snippet.publishedAt;

      newVideo.tags = await this.tagRepository.addTags(
        newVideo.title,
        inputYoutubeVideoData.category === 'official',
        inputYoutubeVideoData?.tags,
      );
      console.log(newVideo);
      await this.youtubeVideos.save(newVideo);
      return {
        ok: true,
        videoTitle: newVideo.title,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('video could not be added');
    }
  }

  async getAll(): Promise<YoutubeVideo[]> {
    try {
      return await this.connection
        .getRepository(YoutubeVideo)
        .createQueryBuilder('video')
        .select([
          'video.title',
          'video.description',
          'video.thumbnails',
          'video.publishedAt',
          'video.visitedCount',
          'video.category',
          'channel.title',
          'channel.thumbnails',
        ])
        .leftJoin('video.channel', 'channel')
        .orderBy({
          'video.visitedCount': 'DESC',
          'video.publishedAt': 'DESC',
        })
        .getMany();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `couldn't load all video data due to server error`,
      );
    }
  }

  // 태그 찾기
  async getOne(videoId: string): Promise<YoutubeVideo> {
    try {
      const video = await this.connection
        .getRepository(YoutubeVideo)
        .createQueryBuilder('video')
        .select([
          'video.id',
          'video.title',
          'video.description',
          'video.thumbnails',
          'video.publishedAt',
          'video.visitedCount',
          'video.category',
          'channel.thumbnails',
          'tag.title',
        ])
        .leftJoin('video.channel', 'channel')
        .leftJoin('video.tags', 'tag')
        .where('video.id = :id', { id: videoId })
        .getOneOrFail();

      video.visitedCount += 1;
      await this.youtubeVideos.save(video);

      return video;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('failed to found this video!');
    }
  }
}
