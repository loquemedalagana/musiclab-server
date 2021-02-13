import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YoutubeChannel } from './entities/youtube-channel.entity';
import { CreateYoutubeChannelDto } from './dtos/create-youtube-channel.dto';
import { getChannelInfo } from '../youtube/lib/endpoints';
import JeonInhyukBandOfficialChannelVideoList from './sampleData/string/JeonInhyukBandOfficialChannelVideoList';

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
    const reg = new RegExp(channelData.channelId);
    if (!reg.test(JeonInhyukBandOfficialChannelVideoList)) {
      console.log('not exist');
      return;
    }
    console.log(reg.test(JeonInhyukBandOfficialChannelVideoList));
    console.log(getChannelInfo(channelData.channelId));
  }
}
