export const getEpisodesIds = (episodes: string[]) => {
  return episodes.map((episode) => {
    const match = episode.match(/\/(\d+)$/);
    return match ? parseInt(match[1]) : null;
  });
};
