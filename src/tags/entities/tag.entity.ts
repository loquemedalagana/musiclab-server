import { Column, JoinTable, ManyToMany } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { IsString } from 'class-validator';
import { YoutubeVideo } from 'src/youtube-videos/entities/youtube-video.entity';

export class Tag extends CoreEntity {
  @Column({ nullable: true })
  @IsString()
  thumbnail: string;

  // @ManyToMany(() => YoutubeVideo)
  // @JoinTable()
  // youtubeVideos: YoutubeVideo[];
}
