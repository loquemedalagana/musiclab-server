import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { YoutubeVideo } from '../youtube-videos/entities/youtube-video.entity';
import { YoutubeChannel } from './entities/youtube-channel.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { CreateYoutubeChannelDto } from './dtos/create-youtube-channel.dto';
import { getChannelInfo, getChannelVideoList } from '../youtube/lib/endpoints';
import getVideoDataFromPlaylistId from './lib/getVideoDataFromPlaylistId';
import JeonInhyukBandOfficialChannelVideoList from './sampleData/string/JeonInhyukBandOfficialChannelVideoList';
import { extractTags } from '../youtube-videos/lib/extractTags';

@Injectable()
export class YoutubeChannelsService {
  constructor(
    @InjectRepository(YoutubeChannel)
    private readonly youtubeChannelsRepository: Repository<YoutubeChannel>,
    @InjectRepository(YoutubeVideo)
    private connection: Connection,
  ) {}

  // 채널 더하기
  async addChannelVideos(videos: Array<YoutubeVideo>) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // for loop and add tags
      // commit
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  getOne(id: string): Promise<YoutubeChannel> {
    return this.youtubeChannelsRepository.findOne(id);
  }

  create(channelData: CreateYoutubeChannelDto) {
    console.log(channelData);
    const reg = new RegExp(channelData.channelId);
    if (!reg.test(JeonInhyukBandOfficialChannelVideoList)) {
      throw new BadRequestException('cannot found channel data');
    }
    // get channel info와 get channel videolist는 axios로 대체한다.
    const responsedChannelData = getChannelInfo(channelData.channelId);
    const [channelRawData] = responsedChannelData.items;
    const playlistId = channelRawData.contentDetails?.relatedPlaylists?.uploads;
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
        const tags = extractTags(video);

        newChannlVideo.category = channelData.category;
        newChannlVideo.id = video.id;
        newChannlVideo.publishedAt = video.publishedAt;
        newChannlVideo.title = video.title;
        newChannlVideo.description = video.description;
        newChannlVideo.thumbnails = video.thumbnails;
        newChannlVideo.channelId = video.channelId;
        newChannlVideo.tags = tags.map((tag) => {
          const newTag = new Tag();
          newTag.title = tag;
          return newTag;
        });

        return newChannlVideo;
      },
    );
    console.log(newChannel);
    console.log(videoListData);
  }
}
