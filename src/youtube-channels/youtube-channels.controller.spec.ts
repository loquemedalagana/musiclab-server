import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeChannelsController } from './youtube-channels.controller';

describe('YoutubeChannelController', () => {
  let controller: YoutubeChannelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoutubeChannelsController],
    }).compile();

    controller = module.get<YoutubeChannelsController>(
      YoutubeChannelsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
