const getVideoDataFromVideoId = (data) =>
  data
    ? data.items.map(({ id, snippet }) => {
        return {
          id: id,
          ...snippet,
        };
      })[0]
    : null;

export default getVideoDataFromVideoId;
