import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { YoutubeVideosService } from './youtube-videos.service';
import { CreateYoutubeVideoDto } from './dtos/create-youtube-video-dto';

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

  @Post()
  create(@Body() videoData: CreateYoutubeVideoDto) {
    return this.youtubeVideosService.create(videoData);
  }
}
