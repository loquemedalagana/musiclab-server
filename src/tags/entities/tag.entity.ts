import { Column, Entity, EntityRepository, Repository } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { IsOptional, IsString } from 'class-validator';
import {
  albumList,
  albumTitleList,
} from '../../common/staticData/yadaSongList';

@Entity()
export class Tag extends CoreEntity {
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  thumbnail?: string;
}

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  private static removeSpecialChars(text: string): string {
    return text.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|\s+]/gi, '');
  }
  private static removeSpecialCharsAndSpace(text: string): string {
    return text.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi, '');
  }
  private extractTags(content: string): Array<string> {
    let tags: string[] = [];
    albumList.forEach((album, index) => {
      const taglist = album
        .filter(
          (songTitle): boolean =>
            content.includes(songTitle) ||
            content.includes(TagRepository.removeSpecialChars(songTitle)) ||
            content.includes(
              TagRepository.removeSpecialCharsAndSpace(songTitle),
            ),
        )
        .map((songTitle): string =>
          TagRepository.removeSpecialCharsAndSpace(songTitle),
        );
      if (taglist.length > 0) {
        tags.push(albumTitleList[index].title.replace(/\s+/g, ''));
        tags.push(albumTitleList[index].description.replace(/\s+/g, ''));
        if (albumTitleList[index].etc) tags.push(albumTitleList[index].etc);
      }
      if (taglist.includes('약속')) tags.push('전인혁작곡');
      if (taglist.includes('Miracle')) {
        tags.push('GuitarSolo');
      }
      tags = tags.concat(taglist);
    });
    return tags;
  }

  findOrCreate(
    title: string,
    isOfficial: boolean,
    inputedTags?: Array<string>,
  ) {
    let extractedTags: string[] = this.extractTags(title);
    if (isOfficial) extractedTags.push('전인혁밴드');
    if (inputedTags) extractedTags = extractedTags.concat(inputedTags);
    console.log(extractedTags);
  }
}
