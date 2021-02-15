import { TagTitle } from 'src/tags/types/tag';
import { YoutubeThumbnailImage } from './thumbnail';

export interface IYoutubeFullData {
  id: string;
  category: 'official' | 'Inhyuk' | 'cover';
  videoId: string;
  channelTitle: string;
  playlistId?: string;
  thumbnails: YoutubeThumbnailImage;
  title: string;
  description: string;
  publishedAt: string;
  visitedCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  PostId?: number;
  // tags??
  Tags?: TagTitle[];
}

export interface IYoutubeChannel {
  id: string;
  category: 'official' | 'Inhyuk' | 'cover';
  title: string;
  thumbnails: YoutubeThumbnailImage;
  description: string;
  playlistId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
