import { IsEnum, IsOptional, IsString } from 'class-validator';
import { YoutubeCategory } from '../../entities/core/youtube.core.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

export class YoutubeVideoInput {
  @IsString()
  readonly videoId: string;

  @IsEnum(YoutubeCategory)
  readonly category: YoutubeCategory;

  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];
}

export class YoutubeVideoOutput extends CoreOutput {
  @IsString()
  videoTitle?: string;
}
