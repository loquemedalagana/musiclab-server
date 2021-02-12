import { Controller, Get, Param } from '@nestjs/common';
import { YoutubeChannelsService } from './youtube-channels.service';

@Controller('api/youtube/channels')
export class YoutubeChannelsController {
  constructor(
    private readonly youtubeChannelsService: YoutubeChannelsService,
  ) {}

  @Get(':id')
  getOne(@Param('id') channelId: string) {
    return this.youtubeChannelsService.getOne(channelId);
  }

  // post
}
