import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YoutubeVideo } from './entities/youtube-video.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  YoutubeVideoInput,
  YoutubeVideoOutput,
} from './dtos/create-youtube-video-dto';
import singleVideoDataString from './sampleData/string/singleVideoDataString';

@Injectable()
export class YoutubeVideosService {
  constructor(
    @InjectRepository(YoutubeVideo)
    private readonly youtubeVideos: Repository<YoutubeVideo>,
    @InjectRepository(Tag)
    private readonly tags: Repository<Tag>,
  ) {}

  async create(
    inputYoutubeVideoData: YoutubeVideoInput,
  ): Promise<YoutubeVideoOutput> {
    const reg = new RegExp(inputYoutubeVideoData.videoId);
    // 나중에 axios로 대체
    const [videoDataString] = singleVideoDataString.filter((video) =>
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

      console.log(newVideo);
      return {
        ok: true,
        videoTitle: newVideo.title,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'Could not create video',
      };
    }
  }

  // async should be added
  async getAll(): Promise<YoutubeVideo[]> {
    return this.youtubeVideos.find();
  }

  // 조회수 1씩 더하기 find and update 후 return 해주기
  getOne(id: string) {
    return this.youtubeVideos.findOne(id);
  }
}
