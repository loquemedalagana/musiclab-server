const getVideoDataFromVideoId = (data) =>
  data
    ? data.items.map(({ id, snippet }) => {
        return {
          videoId: id,
          ...snippet,
        };
      })[0]
    : null;

export default getVideoDataFromVideoId;
