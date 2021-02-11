const JeonInhyukBandOfficialChannel = 'UChNtl7wRLF6x4B4fp7KCyhQ';
const JeonInhyukBandPlayListId = 'UUhNtl7wRLF6x4B4fp7KCyhQ';

const GOOGLE_API_KEY =
  process.env.NODE_ENV !== 'production'
    ? process.env.GOOGLE_API_KEY_DEVELOPMENT
    : process.env.GOOGLE_API_KEY_PRODUCTION;

const comma = '%2';

const YOUTUBE_PLAYLIST_ITEMS_API =
  'https://www.googleapis.com/youtube/v3/playlistItems';
const YOUTUBE_CHANNEL_ITEMS_API =
  'https://www.googleapis.com/youtube/v3/channels';

//not official
const YOUTUBE_VIDEO_ITEM_API = 'https://www.googleapis.com/youtube/v3/videos';
const YOUTUBE_VIDEO_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';

exports.JeonInhyukBandChannelEndPoint = `${YOUTUBE_CHANNEL_ITEMS_API}?part=snippet${comma}CcontentDetails&id=${JeonInhyukBandOfficialChannel}&key=${GOOGLE_API_KEY}`;
exports.JeonInhyukBandPlayListEndPoint = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet${comma}CcontentDetails&playlistId=${JeonInhyukBandPlayListId}&key=${GOOGLE_API_KEY}`;

// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YoutubeApiKey}
exports.getEndpointFromVideoId = (videoId: string) =>
  `${YOUTUBE_VIDEO_ITEM_API}?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`;
exports.getEndpointFromPlayListId = (playlistId: string, maxResult: number) =>
  `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet${comma}CcontentDetails&playlistId=${playlistId}&maxResults=${maxResult}&key=${GOOGLE_API_KEY}`;
