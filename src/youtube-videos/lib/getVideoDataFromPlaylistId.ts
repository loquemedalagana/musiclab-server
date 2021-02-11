const getVideoDataFromPlaylistId = (data) =>
  data
    ? data.items.map(({ snippet, contentDetails }) => {
        return {
          videoId: contentDetails.videoId,
          ...snippet,
        };
      })
    : [];

export default getVideoDataFromPlaylistId;
