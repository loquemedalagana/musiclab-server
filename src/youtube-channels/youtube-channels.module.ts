import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeChannelsService } from './youtube-channels.service';
import { YoutubeChannelsController } from './youtube-channels.controller';
import { YoutubeChannel } from './entities/youtube-channel.entity';
import { YoutubeVideoRepository } from 'src/youtube-videos/entities/youtube-video.entity';
import { TagRepository } from 'src/tags/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      YoutubeChannel,
      YoutubeVideoRepository,
      TagRepository,
    ]),
  ],
  controllers: [YoutubeChannelsController],
  providers: [YoutubeChannelsService],
})
export class YoutubeChannelsModule {}
