import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
  getYoutubeVideoListByTagName(tagname: string) {
    // will be decoded by a custom pipe
    return `tag name is ${tagname}`;
  }
}
