type ImageInfo = {
  url: string;
  width: number;
  height: number;
};

export type YoutubeThumbnailImage = {
  high: ImageInfo;
  medium: ImageInfo;
  default: ImageInfo;
  maxres?: ImageInfo;
  standard?: ImageInfo;
};
