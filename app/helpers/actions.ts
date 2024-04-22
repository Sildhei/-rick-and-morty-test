'use server';

import { getAllCharacters, getAllCharactersProps } from '../api/getAllCharacters';
import { getCharacterEpisodes } from '../api/getCharacterEpisodes';

export async function getEpisodesAction(episodes: number[]) {
  const response = getCharacterEpisodes(episodes);
  return response;
}

export async function getCharactersAction({ page, name }: getAllCharactersProps) {
  const response = getAllCharacters({ page: page, name: name });
  return response;
}
