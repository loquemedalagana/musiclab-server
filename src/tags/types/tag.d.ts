export interface ITag {
  id?: number;
  title: string;
  thumbnailImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

type TagRelation = {
  createdAt: Date;
  updatedAt: Date;
  TagId: number;
  YoutubeVideoId: number;
};

export type TagTitle = {
  title: string;
  YoutubeVideoTag: TagRelation;
};
