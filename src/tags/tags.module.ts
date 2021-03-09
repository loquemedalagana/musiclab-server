import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag } from '../entities/tag/tag.entity';
import { YoutubeVideo } from 'src/entities/youtube/youtube-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, YoutubeVideo])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
