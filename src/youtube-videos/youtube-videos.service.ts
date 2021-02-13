import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YoutubeVideo } from './entities/youtube-video.entity';
import { CreateYoutubeVideoDto } from './dtos/create-youtube-video-dto';

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

  create(youtubeVideoData: CreateYoutubeVideoDto) {
    console.log(youtubeVideoData);
  }
}
