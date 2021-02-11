import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeChannelsController } from './youtube-channels/youtube-channels.controller';
import { YoutubeVideosController } from './youtube-videos/youtube-videos.controller';
import { TagsController } from './tags/tags.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    YoutubeChannelsController,
    YoutubeVideosController,
    TagsController,
  ],
  providers: [AppService],
})
export class AppModule {}
