import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/youtube/channels')
export class YoutubeChannelsController {
  @Get(':id')
  getOne(@Param('id') channelId: string) {
    return `channel id ${channelId} will be returned`;
  }

  // post
}
