import { Controller, Get, Param } from '@nestjs/common';
import { YoutubeVideosService } from './youtube-videos.service';

@Controller('api/youtube/videos')
export class YoutubeVideosController {
  constructor(private readonly youtubeVideosService: YoutubeVideosService) {}

  @Get()
  getAll() {
    // infinite scroll will be added
    return this.youtubeVideosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') videoId: string) {
    return this.youtubeVideosService.getOne(videoId);
  }

  // post
  // 우선 받아온 데이터로 해보자~
}
