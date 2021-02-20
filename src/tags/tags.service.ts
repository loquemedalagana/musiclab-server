import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { YoutubeVideo } from '../youtube-videos/entities/youtube-video.entity';
import { Tag } from './entities/tag.entity';
import { TagOutputDto } from "./dtos/tag.output.dto";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    private readonly connection: Connection,
  ) {}

  async getAllTags(): Promise<Tag[]> {
    try {
      return await this.connection
        .getRepository(Tag)
        .createQueryBuilder('tag')
        .select('tag.title')
        .orderBy({
          'tag.title': 'ASC',
        })
        .getMany();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('cannot load all tag list');
    }
  }

  // async
  async getYoutubeVideoListByTagName(
    decodedTagname: string,
  ): Promise<YoutubeVideo[]> {
    try {
      return await this.connection
        .getRepository(YoutubeVideo)
        .createQueryBuilder('video')
        .select([
          'video.id',
          'video.title',
          'video.description',
          'video.thumbnails',
          'video.channelId',
          'video.publishedAt',
          'video.visitedCount',
          'video.tags',
        ])
        .leftJoin('video.tags', 'tag')
        .where('tag.title = :title', { title: decodedTagname })
        .orderBy({
          'video.visitedCount': 'DESC',
          'video.publishedAt': 'DESC',
        })
        .getMany();
    } catch (error) {
      console.error(error);
      throw new NotFoundException(
        `There is no video related with ${decodedTagname}`,
      );
    }
  }
}
