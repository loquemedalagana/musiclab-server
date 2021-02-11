import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeVideosController } from './youtube-videos.controller';

describe('YoutubeVideosController', () => {
  let controller: YoutubeVideosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoutubeVideosController],
    }).compile();

    controller = module.get<YoutubeVideosController>(YoutubeVideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
