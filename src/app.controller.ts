import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: `search result` })
  @Get('api/search')
  getSearchResult(
    @Query('q') q: string,
    @Query('perPage') perPage: string,
    @Query('page') page: string,
  ) {
    return this.appService.getSearchResult(
      decodeURIComponent(q),
      +perPage,
      +page,
    );
  }
}
