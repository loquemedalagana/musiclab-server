import { IsEnum, IsString } from 'class-validator';
import { YoutubeCategory } from '../../youtube/entities/youtube.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

// data type of a request body
export class YoutubeChannelInput {
  @IsString()
  readonly channelId: string;

  @IsEnum(YoutubeCategory)
  readonly category: YoutubeCategory;
}

export class YoutubeChannelOutput extends CoreOutput {
  channelTitle?: string;
}
