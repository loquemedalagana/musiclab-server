import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { YoutubeVideo } from 'src/entities/youtube/youtube-video.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(YoutubeVideo)
    private readonly youtubeVideos: Repository<YoutubeVideo>,
    private readonly connection: Connection,
  ) {}

  getHello(): string {
    return '<h1>Musiclab new server</h1>';
  }

  async getSearchResult(decodedQuery: string, perPage: number, page: number) {
    console.log(`perpage is ${perPage} page is ${page}`);
    console.log(decodedQuery);
    try {
      return await this.connection
        .getRepository(YoutubeVideo)
        .createQueryBuilder('video')
        .select([
          'video.id',
          `video.title`,
          'video.description',
          'video.thumbnails',
          'video.publishedAt',
          'video.visitedCount',
          'video.category',
          'video.channelId',
          'channel.title',
          'channel.thumbnails',
        ])
        .leftJoin('video.channel', 'channel')
        .where(`video.title LIKE :query`, { query: `%${decodedQuery}%` })
        .orderBy({
          'video.visitedCount': 'DESC',
          'video.publishedAt': 'DESC',
        })
        .take(perPage)
        .skip(perPage * (page - 1))
        .getMany();
    } catch (error) {
      console.error(error);
      throw new NotFoundException('could not find result');
    }
  }
}
