import { IsEnum, IsOptional, IsString } from 'class-validator';
import { YoutubeCategory } from '../../youtube/entities/youtube.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

export class YoutubeVideoDtoInput {
  @IsString()
  readonly videoId: string;

  @IsEnum(YoutubeCategory)
  readonly category: YoutubeCategory;

  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];
}

export class YoutubeVideoOutput extends CoreOutput {
  videoTitle?: string;
}
