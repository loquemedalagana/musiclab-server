import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeChannelsService } from './youtube-channels.service';

describe('YoutubeChannelsService', () => {
  let service: YoutubeChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeChannelsService],
    }).compile();

    service = module.get<YoutubeChannelsService>(YoutubeChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
