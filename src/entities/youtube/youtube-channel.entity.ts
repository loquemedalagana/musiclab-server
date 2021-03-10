import { Column, Entity, OneToMany } from 'typeorm';
import { YoutubeCoreEntity } from 'src/entities/core/youtube.core.entity';
import { YoutubeVideo } from 'src/entities/youtube/youtube-video.entity';

@Entity()
export class YoutubeChannel extends YoutubeCoreEntity {
  @Column({ type: 'varchar', length: 30 })
  playlistId: string;

  @OneToMany(() => YoutubeVideo, (video) => video.channel)
  videos: YoutubeVideo[];
}
