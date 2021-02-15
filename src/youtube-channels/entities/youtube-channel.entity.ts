import { Column, Entity, OneToMany } from 'typeorm';
import { YoutubeEntity } from 'src/youtube/entities/youtube.entity';
import { YoutubeVideo } from 'src/youtube-videos/entities/youtube-video.entity';

@Entity()
export class YoutubeChannel extends YoutubeEntity {
  @Column({ type: 'varchar', length: 30 })
  playlistId: string;

  @OneToMany(() => YoutubeVideo, (video) => video.channel)
  videos: YoutubeVideo[];
}
