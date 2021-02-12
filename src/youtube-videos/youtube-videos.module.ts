import { Module } from '@nestjs/common';
import { YoutubeVideosService } from './youtube-videos.service';
import { YoutubeVideosController } from './youtube-videos.controller';

@Module({
  controllers: [YoutubeVideosController],
  providers: [YoutubeVideosService],
})
export class YoutubeVideosModule {}
