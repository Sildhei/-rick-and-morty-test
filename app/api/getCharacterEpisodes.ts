export interface IEpisodeData {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export const getCharacterEpisodes = async (episodesIds: number[]) => {
  const res = await fetch(`${process.env.BASE_URL}/episode/${episodesIds}`, {
    method: 'GET',
    next: { tags: ['episodes-data'] },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
