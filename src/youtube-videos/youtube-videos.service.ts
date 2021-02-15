import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { YoutubeVideo } from './entities/youtube-video.entity';
import { TagRepository } from 'src/tags/entities/tag.entity';
import {
  YoutubeVideoInput,
  YoutubeVideoOutput,
} from './dtos/create-youtube-video.dto';
import singleVideoDummyData from './sampleData/string/singleVideoDummyData';
import { getEndpointFromVideoId } from 'src/youtube/lib/endpoints';

@Injectable()
export class YoutubeVideosService {
  constructor(
    @InjectRepository(YoutubeVideo)
    private readonly youtubeVideos: Repository<YoutubeVideo>,
    private readonly tagRepository: TagRepository,
  ) {}

  private getYoutubeVideoData(videoId: string): Promise<any> {
    const endpoint = getEndpointFromVideoId(videoId);
    return axios.get(endpoint);
  }

  async create(
    inputYoutubeVideoData: YoutubeVideoInput,
  ): Promise<YoutubeVideoOutput> {
    const reg = new RegExp(inputYoutubeVideoData.videoId);
    // 나중에 axios로 대체
    const [videoDataString] = singleVideoDummyData.filter((video) =>
      reg.test(video),
    );
    if (!videoDataString) {
      throw new BadRequestException('not found video data');
    }

    try {
      const newVideo = new YoutubeVideo();
      const [videoRawData] = JSON.parse(videoDataString).items;

      newVideo.id = inputYoutubeVideoData.videoId;
      newVideo.category = inputYoutubeVideoData.category;
      newVideo.thumbnails = videoRawData.snippet.thumbnails;
      newVideo.title = videoRawData.snippet.title;
      newVideo.description = videoRawData.snippet.description;
      newVideo.publishedAt = videoRawData.snippet.publishedAt;

      newVideo.tags = await this.tagRepository.addTags(
        newVideo.title,
        inputYoutubeVideoData.category === 'official',
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

  // async should be added
  async getAll(): Promise<YoutubeVideo[]> {
    try {
      const allVideos = await this.youtubeVideos.find();
      return allVideos;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `couldn't load all video data due to server error`,
      );
    }
  }

  // 조회수 1씩 더하기 find and update 후 return 해주기
  // 태그도 같이 리턴해주기, 복합쿼리 사용, 채널정보도 같이ㅠㅠ
  async getOne(id: string): Promise<YoutubeVideo> {
    try {
      const video = await this.youtubeVideos.findOne(id, {
        relations: ['tags'],
      });
      video.visitedCount += 1;
      return this.youtubeVideos.save(video);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(`the video couldn't be loaded`);
    }
  }
}
