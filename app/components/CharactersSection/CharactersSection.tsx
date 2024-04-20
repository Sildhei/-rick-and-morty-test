'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import CharacterCard from './CharacterCard';
import { getEpisodesIds } from '@/app/helpers/getEpisodesId';
import { CharactersProps } from '../MainSection/MainSection';
import { ICharacterData } from '@/app/api/getAllCharacters';
import { IEpisodeData } from '@/app/api/getCharacterEpisodes';
import { getCharactersAction, getEpisodesAction } from '@/app/helpers/actions';

interface CharactersSectionProps extends CharactersProps {
  selectedCharacters: { id: number; name: string }[];
  setSelectedCharacters: Dispatch<SetStateAction<{ id: number; name: string }[]>>;
  setEpisodes: Dispatch<SetStateAction<IEpisodeData[][]>>;
}

const CharactersSection = ({
  characters,
  selectedCharacters,
  setSelectedCharacters,
  setEpisodes,
}: CharactersSectionProps) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    getCharactersAction({ page: 1, name: name });
  }, [name]);

  const charactersLists = useMemo(() => {
    return [
      characters.results.slice(0, characters.results.length / 2),
      characters.results.slice(characters.results.length / 2, characters.results.length),
    ];
  }, [characters]);

  const handleOnClickCharacter = async (character: ICharacterData, index: number) => {
    setSelectedCharacters(prev => {
      const newSelectedCharacters = [...prev];
      newSelectedCharacters[index] = { id: character.id, name: character.name };
      return newSelectedCharacters;
    });

    const episodesIds = getEpisodesIds(character.episode);

    const episodesData = await getEpisodesAction(episodesIds);

    setEpisodes(prev => {
      const newEpisodes = [...prev];
      newEpisodes[index] = Array.isArray(episodesData) ? episodesData : [episodesData];
      return newEpisodes;
    });
  };

  console.log('name', name);

  return (
    <div className='flex flex-col md:flex-row items-center justify-between mt-4 gap-4'>
      {charactersLists.map((list, index) => (
        <div className='border-[1px] border-gray-800 rounded-md p-4' key={list[0].name}>
          <div className='flex flex-row gap-4 items-center'>
            <h3 className='text-gray-800 font-bold text-xl'>Character #{index + 1}</h3>
            <input
              className='shadow h-[25px] text-sm pl-2 appearance-none border rounded border-primary text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              id='textInput'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Search by name...'
            />
          </div>

          <div className='grid grid-cols-2 gap-4 mt-4'>
            {list.map(character => (
              <div
                key={character.id}
                role='button'
                onClick={() =>
                  index === 1 && selectedCharacters.length === 0 ? null : handleOnClickCharacter(character, index)
                }
                className={`${index === 1 && selectedCharacters.length === 0 ? 'cursor-not-allowed' : null}`}>
                <CharacterCard character={character} selectedCharacters={selectedCharacters} index={index} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharactersSection;
