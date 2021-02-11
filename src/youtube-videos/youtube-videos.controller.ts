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
    return `channel id ${videoId} will be returned`;
  }

  // post
}
