import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { YoutubeVideo } from '../youtube-videos/entities/youtube-video.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    private readonly connection: Connection,
  ) {}

  async getAllTags(): Promise<Tag[]> {
    try {
      return await this.connection
        .getRepository(Tag)
        .createQueryBuilder('tag')
        .select('tag.title')
        .orderBy({
          'tag.title': 'ASC',
        })
        .getMany();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('cannot load all tag list');
    }
  }

  // async
  async getYoutubeVideoListByTagName(tagname: string): Promise<YoutubeVideo[]> {
    try {
      // 해당 태그를 가지고 있는 영상 리스트 출력 (쿼리 꽤 어려울 듯ㅠㅠ)
      return [];
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`There is no video related with ${tagname}`);
    }
  }
}

/*

router.get("/load", async (req, res, next) => {
  // 쿼리로 유저의 지역 추가
  try {
    // 모든 태그 검출하기
    const tagList = await Tag.findAll({
      attributes: ["title"],
    });
    if (!tagList) return res.json([]);
    return res.json(tagList);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// all, youtube, post etc
router.get("/:tagname/youtube", async (req, res, next) => {
  const tagName = decodeURIComponent(req.params.tagname);
  const isOfficial = tagName === "전인혁밴드" || tagName === "jeoninhyukband";
  try {
    let where = {};
    let whereTag = {};
    if (isOfficial) {
      where = {
        channelId: "UChNtl7wRLF6x4B4fp7KCyhQ",
      };
      whereTag = {
        [Op.or]: [{ title: "전인혁밴드" }, { title: "jeoninhyukband" }],
      };
    } else {
      whereTag = {
        title: tagName,
      };
    }

    const youtubeVideoList = await YoutubeVideo.findAll({
      //where,
      order: [
        ["publishedAt", "DESC"],
        ["title", "ASC"],
      ],
      include: [
        {
          model: Tag,
          as: "Tags",
          //required: !isOfficial,
          where: whereTag,
          attributes: ["title"],
        },
      ],
    });
    res.json(youtubeVideoList);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

*/
