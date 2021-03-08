import { Controller, Get, Param } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';

@ApiTags('TAGS')
@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: `get All tags' info` })
  @Get()
  getAllTagTitle() {
    return this.tagsService.getAllTags();
  }

  @ApiOperation({ summary: `get all youtube videos based on a tag` })
  @Get(':tagname/youtube')
  getYoutubeVideoListByTagName(@Param('tagname') tagname: string) {
    return this.tagsService.getYoutubeVideoListByTagName(
      decodeURIComponent(tagname),
    );
  }
}
