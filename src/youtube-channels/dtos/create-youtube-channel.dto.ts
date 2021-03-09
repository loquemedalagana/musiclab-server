import { IsEnum, IsString } from 'class-validator';
import { YoutubeCategory } from 'src/entities/core/youtube.core.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

// data type of a request body
export class YoutubeChannelInput {
  @IsString()
  readonly channelId: string;

  @IsEnum(YoutubeCategory)
  readonly category: YoutubeCategory;
}

export class YoutubeChannelOutput extends CoreOutput {
  @IsString()
  channelTitle?: string;
}
