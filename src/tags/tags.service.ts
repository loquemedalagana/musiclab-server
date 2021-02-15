import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { GetYoutubeVideoRepository } from 'src/youtube-videos/entities/youtube-video.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    private readonly getYoutubeVideoRepository: GetYoutubeVideoRepository,
  ) {}

  // async
  getYoutubeVideoListByTagName(tagname: string) {
    // will be decoded by a custom pipe
    return `tag name is ${tagname}`;
  }
}
