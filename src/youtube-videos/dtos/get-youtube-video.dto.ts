import { CoreOutput } from 'src/common/dtos/output.dto';
import { YoutubeVideo } from '../../entities/youtube/youtube-video.entity';

export class GetSingleYoutubeVideoDto extends CoreOutput {}

export class GetYoutubeVideoListDto extends CoreOutput {
  videos?: YoutubeVideo[];
}
