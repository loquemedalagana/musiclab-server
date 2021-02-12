import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeChannelsModule } from './youtube-channels/youtube-channels.module';
import { YoutubeVideosModule } from './youtube-videos/youtube-videos.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [YoutubeChannelsModule, YoutubeVideosModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
