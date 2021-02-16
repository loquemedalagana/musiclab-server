import { Column, Entity, EntityRepository, AbstractRepository } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { IsOptional, IsString } from 'class-validator';
import {
  albumList,
  albumTitleList,
} from '../../common/staticData/yadaSongList';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class Tag extends CoreEntity {
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  thumbnail?: string;
}

@EntityRepository(Tag)
export class TagRepository extends AbstractRepository<Tag> {
  private static removeSpecialChars(text: string): string {
    return text.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|\s+]/gi, '');
  }
  private static removeSpecialCharsAndSpace(text: string): string {
    return text.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi, '');
  }

  // 오류가 여기서 난 듯..
  private extractTags(content: string): Array<string> {
    return albumList.reduce(
      (tags: string[], album: string[], index: number) => {
        const taglist = album
          .filter(
            (title) =>
              content.includes(title) ||
              content.includes(TagRepository.removeSpecialChars(title)) ||
              content.includes(TagRepository.removeSpecialCharsAndSpace(title)),
          )
          .map((title) => TagRepository.removeSpecialCharsAndSpace(title));
        tags = tags.concat(taglist);
        if (taglist.length > 0 && index < 5) {
          tags.push(albumTitleList[index].title.replace(/\s+/g, ''));
          tags.push(albumTitleList[index].description.replace(/\s+/g, ''));
          if (albumTitleList[index].etc) tags.push(albumTitleList[index].etc);
        }
        if (taglist.includes('약속')) tags.push('전인혁작곡');
        if (taglist.includes('Miracle')) {
          tags.push('GuitarSolo');
        }
        return tags;
      },
      [],
    );
  }

  private async findOrCreate(title: string): Promise<Tag> {
    const tagName = title.trim().toLowerCase().replace(/\s+/g, '');
    let tag = await this.manager.findOne(Tag, { title: tagName });
    if (!tag) {
      tag = new Tag();
      tag.title = title;
      await this.manager.save(tag);
    }
    return tag;
  }

  // 쿼리빌더 사용하기!!!
  async addTags(
    content: string,
    isOfficial: boolean,
    inputedTags?: Array<string>,
  ): Promise<Tag[]> {
    let extractedTags: string[] = this.extractTags(content);

    // 여기서 나중에 중복제거 해주기!
    if (isOfficial) extractedTags.push('전인혁밴드');
    if (inputedTags) extractedTags = extractedTags.concat(inputedTags);
    console.log('태글 추출 됨?', extractedTags);
    try {
      if (!extractedTags) return [];
      return Promise.all<Tag>(
        extractedTags.map((tagTitle) => this.findOrCreate(tagTitle)),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('failed to add tags');
    }
  }
}
