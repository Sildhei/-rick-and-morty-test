'use server';

import { getCharacterEpisodes } from '../api/getCharacterEpisodes';

export async function getEpisodesAction(episodes: number[]) {
  const response = getCharacterEpisodes(episodes);
  return response;
}
