import JeonInhyukBandOfficialChannelStringData from 'src/youtube/dummyData/JeonInhyukBandOfficialChannelStringData';
import JeonInhyukBandOfficialChannelVideoList from 'src/youtube/dummyData/JeonInhyukBandOfficialChannelVideoList';

const JeonInhyukBandOfficialChannel = 'UChNtl7wRLF6x4B4fp7KCyhQ';
const JeonInhyukBandPlayListId = 'UUhNtl7wRLF6x4B4fp7KCyhQ';

const comma = '%2';

const YOUTUBE_PLAYLIST_ITEMS_API =
  'https://www.googleapis.com/youtube/v3/playlistItems';
const YOUTUBE_CHANNEL_ITEMS_API =
  'https://www.googleapis.com/youtube/v3/channels';

//not official
const YOUTUBE_VIDEO_ITEM_API = 'https://www.googleapis.com/youtube/v3/videos';
const YOUTUBE_VIDEO_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';

export const JeonInhyukBandChannelEndPoint = (apiKey: unknown) =>
  `${YOUTUBE_CHANNEL_ITEMS_API}?part=snippet${comma}CcontentDetails&id=${JeonInhyukBandOfficialChannel}&key=${apiKey}`;
export const JeonInhyukBandPlayListEndPoint = (apiKey: unknown) =>
  `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet${comma}CcontentDetails&playlistId=${JeonInhyukBandPlayListId}&key=${apiKey}`;

// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YoutubeApiKey}
export const getEndpointFromVideoId = (
  videoId: string,
  apiKey?: string,
): string =>
  `${YOUTUBE_VIDEO_ITEM_API}?part=snippet&id=${videoId}&key=${apiKey}`;
export const getEndpointFromPlayListId = (
  playlistId: string,
  maxResult: number,
  apiKey: unknown,
): string =>
  `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet${comma}CcontentDetails&playlistId=${playlistId}&maxResults=${maxResult}&key=${apiKey}`;

// 나중에 axios로 대체
export const getChannelInfo = (channelId: string) => {
  return JSON.parse(JeonInhyukBandOfficialChannelStringData);
};

export const getChannelVideoList = (playlistId: string) => {
  return JSON.parse(JeonInhyukBandOfficialChannelVideoList);
};
