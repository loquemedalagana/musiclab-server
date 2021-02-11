import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/tags')
export class TagsController {
  @Get(':tagname/youtube')
  getYoutubeVideoListByTagName(@Param('tagname') tagname: string) {
    // will be decoded
    return `tag name is ${tagname}`;
  }
}
