import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/youtube/videos')
export class YoutubeVideosController {
  @Get()
  getAll() {
    // infinite scroll will be added
    return `all videos will be returned`;
  }

  @Get(':id')
  getOne(@Param('id') videoId: string) {
    return `video id ${videoId} will be returned`;
  }

  // post
  // 우선 받아온 데이터로 해보자~
}
