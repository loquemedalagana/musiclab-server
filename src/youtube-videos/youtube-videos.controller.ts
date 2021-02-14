import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { YoutubeVideosService } from './youtube-videos.service';
import { YoutubeVideoInput } from './dtos/create-youtube-video-dto';

@Controller('api/youtube/videos')
export class YoutubeVideosController {
  constructor(private readonly youtubeVideosService: YoutubeVideosService) {}

  // pagination???
  @Get()
  getAll() {
    return this.youtubeVideosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') videoId: string) {
    return this.youtubeVideosService.getOne(videoId);
  }

  @Post()
  create(@Body() videoData: YoutubeVideoInput) {
    return this.youtubeVideosService.create(videoData);
  }
}
