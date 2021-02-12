import { IsEnum, IsString } from 'class-validator';
import { YoutubeChannelCategory } from '../entities/youtube-channel.entity';

// data type of a request body
export class CreateYoutubeChannelDto {
  @IsString()
  readonly channelId: string;

  @IsEnum(YoutubeChannelCategory)
  readonly category: YoutubeChannelCategory;
}
