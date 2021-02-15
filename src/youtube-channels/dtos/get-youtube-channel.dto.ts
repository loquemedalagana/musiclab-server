import { CoreOutput } from '../../common/dtos/output.dto';
import { YoutubeChannel } from '../entities/youtube-channel.entity';

export class GetYoutubeChannelDto extends CoreOutput {
  channelData: YoutubeChannel;
}
