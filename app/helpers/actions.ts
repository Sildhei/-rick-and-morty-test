'use server';

import { getAllCharacters } from '../api/getAllCharacters';
import { getCharacterEpisodes } from '../api/getCharacterEpisodes';

export async function getEpisodesAction(episodes: number[]) {
  const response = getCharacterEpisodes(episodes);
  return response;
}

export async function getCharactersAction(page: number) {
  const response = getAllCharacters(page);
  return response;
}
