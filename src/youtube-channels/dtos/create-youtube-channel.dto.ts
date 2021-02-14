import { IsEnum, IsString } from 'class-validator';
import { YoutubeCategory } from '../../youtube/entities/youtube.entity';

// data type of a request body
export class CreateYoutubeChannelDto {
  @IsString()
  readonly channelId: string;

  @IsEnum(YoutubeCategory)
  readonly category: YoutubeCategory;
}
