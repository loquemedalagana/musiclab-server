import { IsEnum, IsOptional, IsString } from 'class-validator';
import { YoutubeCategory } from '../../youtube/entities/youtube.entity';

export class CreateYoutubeVideoDto {
  @IsString()
  readonly videoId: string;

  @IsEnum(YoutubeCategory)
  readonly category: YoutubeCategory;

  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];
}
