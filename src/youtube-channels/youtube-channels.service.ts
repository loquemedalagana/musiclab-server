import { Injectable } from '@nestjs/common';

@Injectable()
export class YoutubeChannelsService {
  // define model
  getOne(id: string) {
    return `channel ${id} will be returned`;
  }
}
