import { Column, Entity, EntityRepository, Repository } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class Tag extends CoreEntity {
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  thumbnail: string;
}

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async findOrCreate(title: string): Promise<Tag> {
    const tagTitle = title.trim().toLowerCase().replace(/ /g, '');
    let tag = await this.findOne({ title: tagTitle });
    if (!tag) {
      tag = await this.save(this.create({ title: tagTitle }));
    }
    return tag;
  }
}
