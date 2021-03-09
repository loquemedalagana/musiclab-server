import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeVideosService } from './youtube-videos.service';
import { YoutubeVideosController } from './youtube-videos.controller';
import { YoutubeVideo } from 'src/entities/youtube/youtube-video.entity';
import { TagRepository } from 'src/entities/tag/tag.entity';
import { IYoutubeFetchOptions } from 'src/youtube/types/youtube';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constants';

@Module({})
export class YoutubeVideosModule {
  static forRoot(options?: IYoutubeFetchOptions): DynamicModule {
    return {
      module: YoutubeVideosModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        YoutubeVideosService,
      ],
      imports: [TypeOrmModule.forFeature([YoutubeVideo, TagRepository])],
      controllers: [YoutubeVideosController],
    };
  }
}
