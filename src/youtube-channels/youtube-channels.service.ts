import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { SaveYoutubeVideoRepository } from 'src/youtube-videos/entities/youtube-video.entity';
import { YoutubeChannel } from './entities/youtube-channel.entity';
import { TagRepository } from 'src/tags/entities/tag.entity';
import {
  YoutubeChannelInput,
  YoutubeChannelOutput,
} from './dtos/create-youtube-channel.dto';
import { getChannelInfo } from '../youtube/lib/endpoints';
import JeonInhyukBandOfficialChannelVideoList from 'src/youtube/dummyData/JeonInhyukBandOfficialChannelVideoList';

@Injectable()
export class YoutubeChannelsService {
  constructor(
    @InjectRepository(YoutubeChannel)
    private readonly youtubeChannels: Repository<YoutubeChannel>,
    private readonly saveYoutubeVideoRepository: SaveYoutubeVideoRepository,
    private readonly tagRepository: TagRepository,
    private readonly connection: Connection,
  ) {}

  async create(
    inputChannelData: YoutubeChannelInput,
  ): Promise<YoutubeChannelOutput> {
    // 이 부분 역시 나중에 axios로 대체
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

      const newChannel = new YoutubeChannel();
      newChannel.playlistId = playlistId;
      newChannel.id = channelRawData.id;
      newChannel.title = channelRawData.snippet.title;
      newChannel.description = channelRawData.snippet.description;
      newChannel.thumbnails = channelRawData.snippet.thumbnails;
      newChannel.publishedAt = channelRawData.snippet.publishedAt;

      console.log(newChannel);

      // 영상들 저장
      newChannel.videos = await this.saveYoutubeVideoRepository.addYoutubeVideoList(
        playlistId,
        newChannel.category,
        this.tagRepository,
      );
      await this.youtubeChannels.save(newChannel);

      return {
        ok: true,
        channelTitle: newChannel.title,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('channel could not be added');
    }
  }

  async getOne(channelId: string): Promise<YoutubeChannel> {
    try {
      return await this.connection
        .getRepository(YoutubeChannel)
        .createQueryBuilder('channel')
        .select([
          'channel.title',
          'channel.description',
          'channel.publishedAt',
          'channel.category',
          'channel.thumbnails',
          'video.title',
          'video.description',
          'video.thumbnails',
          'video.publishedAt',
        ])
        .leftJoin('channel.videos', 'video')
        .where('channel.id = :id', { id: channelId })
        .getOneOrFail();
    } catch (error) {
      console.error(error);
      throw new NotFoundException('해당 채널이 등록되어 있지 않습니다.');
    }
  }
}
