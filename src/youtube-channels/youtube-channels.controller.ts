import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { YoutubeChannelsService } from './youtube-channels.service';
import { YoutubeChannelInput } from './dtos/create-youtube-channel.dto';

@Controller('api/youtube/channels')
export class YoutubeChannelsController {
  constructor(
    private readonly youtubeChannelsService: YoutubeChannelsService,
  ) {}

  @Get(':id')
  getOne(@Param('id') channelId: string) {
    return this.youtubeChannelsService.getOne(channelId);
  }

  @Post()
  create(@Body() channelData: YoutubeChannelInput) {
    return this.youtubeChannelsService.create(channelData);
  }
}
