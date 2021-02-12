import { IsEnum, IsOptional, IsString } from 'class-validator';
import { YoutubeVideoCategory } from '../entities/youtube-video.entity';

export class CreateYoutubeVideoDto {
  @IsString()
  readonly videoId: string;

  @IsEnum(YoutubeVideoCategory)
  readonly category: YoutubeVideoCategory;

  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];
}
