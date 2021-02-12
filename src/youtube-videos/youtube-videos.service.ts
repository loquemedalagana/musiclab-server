import { Injectable } from '@nestjs/common';

@Injectable()
export class YoutubeVideosService {
  getAll() {
    return 'all videos will be retuned';
  }

  getOne(videoId: string) {
    return `video ${videoId} will be returned`;
  }
}
