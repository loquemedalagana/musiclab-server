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
      // throw error object
      console.log('not exist');
      return;
    }
    const response = getChannelInfo(channelData.channelId);
    const [channelRawData] = response.items;
    const newChannel = new YoutubeChannel();
    newChannel.category = channelData.category;
    newChannel.playlistId =
      channelRawData.contentDetails?.relatedPlaylists?.uploads;
    newChannel.id = channelRawData.id;
    newChannel.title = channelRawData.snippet.title;
    newChannel.description = channelRawData.snippet.description;
    newChannel.thumbnails = channelRawData.snippet.thumbnails;
    newChannel.publishedAt = channelRawData.snippet.publishedAt;

    console.log(newChannel);
  }
}
