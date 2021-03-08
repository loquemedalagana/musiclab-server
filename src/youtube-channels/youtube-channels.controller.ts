import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { YoutubeChannelsService } from './youtube-channels.service';
import { YoutubeChannelInput } from './dtos/create-youtube-channel.dto';

@ApiTags('YOUTUBE_CHANNELS')
@Controller('api/youtube/channels')
export class YoutubeChannelsController {
  constructor(
    private readonly youtubeChannelsService: YoutubeChannelsService,
  ) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: `get a channel's info` })
  @Get(':id')
  getOne(@Param('id') channelId: string) {
    return this.youtubeChannelsService.getOne(channelId);
  }

  @ApiOperation({ summary: `register a channel` })
  @Post()
  create(@Body() channelData: YoutubeChannelInput) {
    return this.youtubeChannelsService.create(channelData);
  }
}
