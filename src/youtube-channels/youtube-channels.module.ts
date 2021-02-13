import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeChannelsService } from './youtube-channels.service';
import { YoutubeChannelsController } from './youtube-channels.controller';
import { YoutubeChannel } from './entities/youtube-channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YoutubeChannel])],
  controllers: [YoutubeChannelsController],
  providers: [YoutubeChannelsService],
})
export class YoutubeChannelsModule {}
