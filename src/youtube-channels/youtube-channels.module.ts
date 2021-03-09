import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeChannelsService } from './youtube-channels.service';
import { YoutubeChannelsController } from './youtube-channels.controller';
import { YoutubeChannel } from 'src/entities/youtube/youtube-channel.entity';
import {
  SaveYoutubeVideoRepository,
  YoutubeVideo,
} from 'src/entities/youtube/youtube-video.entity';
import { TagRepository } from 'src/entities/tag/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      YoutubeChannel,
      YoutubeVideo,
      SaveYoutubeVideoRepository,
      TagRepository,
    ]),
  ],
  controllers: [YoutubeChannelsController],
  providers: [YoutubeChannelsService],
})
export class YoutubeChannelsModule {}
