import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { YoutubeVideosService } from './youtube-videos.service';
import { YoutubeVideoInput } from './dtos/create-youtube-video.dto';

@ApiTags('YOUTUBE_VIDEOS')
@Controller('api/youtube/videos')
export class YoutubeVideosController {
  constructor(private readonly youtubeVideosService: YoutubeVideosService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: 'get all youtube videos' })
  @Get()
  getAll(@Query('perPage') perPage: string, @Query('page') page: string) {
    return this.youtubeVideosService.getAll(+perPage, +page);
  }

  @ApiOperation({
    summary: 'get best youtube official videos for main page carousel',
  })
  @Get('best/official')
  getOfficialBestVideos() {
    return this.youtubeVideosService.getOfficialBestVideos();
  }

  @ApiOperation({ summary: `get a youtube video's info` })
  @Get(':id')
  getOne(@Param('id') videoId: string) {
    return this.youtubeVideosService.getOne(videoId);
  }

  // guard should be added
  @ApiOperation({ summary: 'add a youtube video' })
  @Post()
  create(@Body() videoData: YoutubeVideoInput) {
    return this.youtubeVideosService.create(videoData);
  }
}
