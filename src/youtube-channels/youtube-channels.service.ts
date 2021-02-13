import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YoutubeChannel } from './entities/youtube-channel.entity';
import { CreateYoutubeChannelDto } from './dtos/create-youtube-channel.dto';
import { getChannelInfo } from '../youtube/lib/endpoints';

@Injectable()
export class YoutubeChannelsService {
  constructor(
    @InjectRepository(YoutubeChannel)
    private readonly youtubeChannelsRepository: Repository<YoutubeChannel>,
  ) {}

  getOne(id: string): Promise<YoutubeChannel> {
    return this.youtubeChannelsRepository.findOne(id);
  }

  create(channelData: CreateYoutubeChannelDto) {
    console.log(channelData);
    if (!/UChNtl7wRLF6x4B4fp7KCyhQ/.test(channelData.channelId)) {
      console.log('not exist');
      return;
    }
    console.log(/UChNtl7wRLF6x4B4fp7KCyhQ/.test(channelData.channelId));
    console.log(getChannelInfo(channelData.channelId));
  }
}
