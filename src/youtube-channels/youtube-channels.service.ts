import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { YoutubeVideo } from '../youtube-videos/entities/youtube-video.entity';
import { YoutubeChannel } from './entities/youtube-channel.entity';
import { Tag, TagRepository } from 'src/tags/entities/tag.entity';
import {
  YoutubeChannelInput,
  YoutubeChannelOutput,
} from './dtos/create-youtube-channel.dto';
import { getChannelInfo, getChannelVideoList } from '../youtube/lib/endpoints';
import getVideoDataFromPlaylistId from './lib/getVideoDataFromPlaylistId';
import JeonInhyukBandOfficialChannelVideoList from './sampleData/string/JeonInhyukBandOfficialChannelVideoList';
import { extractTags } from '../youtube-videos/lib/extractTags';

@Injectable()
export class YoutubeChannelsService {
  constructor(
    @InjectRepository(YoutubeChannel)
    private readonly youtubeChannels: Repository<YoutubeChannel>,
    @InjectRepository(YoutubeVideo)
    private readonly youtubeVideos: Repository<YoutubeVideo>,
    private readonly tagRepository: TagRepository,
  ) {}

  async addChannelVideos(videos: Array<YoutubeVideo>) {}

  async create(
    inputChannelData: YoutubeChannelInput,
  ): Promise<YoutubeChannelOutput> {
    console.log(inputChannelData);
    const reg = new RegExp(inputChannelData.channelId);
    if (!reg.test(JeonInhyukBandOfficialChannelVideoList)) {
      throw new BadRequestException('cannot found channel data');
    }
    // get channel info와 get channel videolist는 axios로 대체한다.
    try {
      const responsedChannelData = getChannelInfo(inputChannelData.channelId);
      const [channelRawData] = responsedChannelData.items;
      const playlistId =
        channelRawData.contentDetails?.relatedPlaylists?.uploads;
      const responsedVideoList = getChannelVideoList(playlistId);

      const newChannel = new YoutubeChannel();
      newChannel.playlistId = playlistId;
      newChannel.id = channelRawData.id;
      newChannel.title = channelRawData.snippet.title;
      newChannel.description = channelRawData.snippet.description;
      newChannel.thumbnails = channelRawData.snippet.thumbnails;
      newChannel.publishedAt = channelRawData.snippet.publishedAt;

      const videoListData = getVideoDataFromPlaylistId(responsedVideoList).map(
        (video) => {
          const newChannlVideo = new YoutubeVideo();
          const tags = extractTags(video.title);
          tags.push('전인혁밴드');

          newChannlVideo.category = inputChannelData.category;
          newChannlVideo.id = video.id;
          newChannlVideo.publishedAt = video.publishedAt;
          newChannlVideo.title = video.title;
          newChannlVideo.description = video.description;
          newChannlVideo.thumbnails = video.thumbnails;
          newChannlVideo.channelId = video.channelId;

          console.log(tags);

          return newChannlVideo;
        },
      );
      console.log(newChannel);
      console.log(videoListData);

      // 영상들 저장

      // await this.youtubeChannels.save(newChannel);

      return {
        ok: true,
        channelTitle: newChannel.title,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'Could not create channel',
      };
    }
  }

  getOne(id: string): Promise<YoutubeChannel> {
    return this.youtubeChannels.findOne(id);
  }
}
