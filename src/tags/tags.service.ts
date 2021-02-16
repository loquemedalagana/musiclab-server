import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { YoutubeVideo } from '../youtube-videos/entities/youtube-video.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    private readonly connection: Connection,
  ) {}

  // async
  getYoutubeVideoListByTagName(tagname: string) {
    // will be decoded by a custom pipe
    return `tag name is ${tagname}`;
  }
}
