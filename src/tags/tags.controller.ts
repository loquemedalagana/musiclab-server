import { Controller, Get, Param } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get(':tagname/youtube')
  getYoutubeVideoListByTagName(@Param('tagname') tagname: string) {
    return this.tagsService.getYoutubeVideoListByTagName(tagname);
  }
}
