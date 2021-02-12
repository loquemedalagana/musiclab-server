import { Module } from '@nestjs/common';
import { YoutubeChannelsService } from './youtube-channels.service';
import { YoutubeChannelsController } from './youtube-channels.controller';

@Module({
  controllers: [YoutubeChannelsController],
  providers: [YoutubeChannelsService],
})
export class YoutubeChannelsModule {}
