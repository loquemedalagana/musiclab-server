const getVideoDataFromPlaylistId = (data) =>
  data
    ? data.items.map(({ snippet, contentDetails }) => {
        return {
          id: contentDetails.videoId,
          ...snippet,
        };
      })
    : [];

export default getVideoDataFromPlaylistId;
