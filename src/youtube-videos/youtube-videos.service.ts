import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YoutubeVideo } from './entities/youtube-video.entity';
import { YoutubeVideoDtoInput } from './dtos/create-youtube-video-dto';
import singleVideoDataString from './sampleData/string/singleVideoDataString';

@Injectable()
export class YoutubeVideosService {
  constructor(
    @InjectRepository(YoutubeVideo)
    private readonly youtubeVideosRepository: Repository<YoutubeVideo>,
  ) {}

  // async should be added
  async getAll(): Promise<YoutubeVideo[]> {
    return this.youtubeVideosRepository.find();
  }

  // 조회수 1씩 더하기 find and update 후 return 해주기
  getOne(id: string) {
    return this.youtubeVideosRepository.findOne(id);
  }

  create(youtubeVideoData: YoutubeVideoDtoInput) {
    const newVideo = new YoutubeVideo();
    const reg = new RegExp(youtubeVideoData.videoId);

    // 나중에 axios로 대체
    const [videoDataString] = singleVideoDataString.filter((video) =>
      reg.test(video),
    );
    if (!videoDataString) {
      throw new BadRequestException('not found video data');
    }

    const [videoRawData] = JSON.parse(videoDataString).items;
    newVideo.id = youtubeVideoData.videoId;
    newVideo.category = youtubeVideoData.category;
    newVideo.thumbnails = videoRawData.snippet.thumbnails;
    newVideo.title = videoRawData.snippet.title;
    newVideo.description = videoRawData.snippet.description;
    newVideo.publishedAt = videoRawData.snippet.publishedAt;

    console.log(newVideo);
  }
}
