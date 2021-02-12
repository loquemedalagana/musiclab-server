import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeVideosService } from './youtube-videos.service';

describe('YoutubeVideosService', () => {
  let service: YoutubeVideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeVideosService],
    }).compile();

    service = module.get<YoutubeVideosService>(YoutubeVideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
