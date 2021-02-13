import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeVideosService } from './youtube-videos.service';
import { YoutubeVideosController } from './youtube-videos.controller';
import { YoutubeVideo } from './entities/youtube-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YoutubeVideo])],
  controllers: [YoutubeVideosController],
  providers: [YoutubeVideosService],
})
export class YoutubeVideosModule {}
