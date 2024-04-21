'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import CharacterCard from './CharacterCard';
import { getEpisodesIds } from '@/app/helpers/getEpisodesId';
import { CharactersProps } from '../MainSection/MainSection';
import { ICharacterData } from '@/app/api/getAllCharacters';
import { IEpisodeData } from '@/app/api/getCharacterEpisodes';
import { getCharactersAction, getEpisodesAction } from '@/app/helpers/actions';
import { useRouter } from 'next/navigation';

interface CharactersSectionProps extends CharactersProps {
  selectedCharacters: { id: number; name: string }[];
  setSelectedCharacters: Dispatch<SetStateAction<{ id: number; name: string }[]>>;
  setEpisodes: Dispatch<SetStateAction<IEpisodeData[][]>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

const CharactersSection = ({
  characters,
  selectedCharacters,
  setSelectedCharacters,
  setEpisodes,
  name,
  setName,
}: CharactersSectionProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!router) {
      return;
    }
    const delay = setTimeout(() => {
      setSelectedCharacters([]);
      setEpisodes([]);
      router.push(`/?name=${name}`);
    }, 500);

    return () => clearTimeout(delay);
  }, [name]);

  const charactersLists = useMemo(() => {
    if (characters.results.length === 1) {
      return [characters.results, []];
    }
    return [
      characters.results.slice(0, characters.results.length / 2),
      characters.results.slice(characters.results.length / 2, characters.results.length),
    ];
  }, [characters]);

  const handleClearSelection = () => {
    setSelectedCharacters([]);
    setEpisodes([]);
  };

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

  return (
    <div>
      <div className='flex flex-col gap-4 md:flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <p className='text-gray-800 font-bold text-lg'>Search by name</p>
          <div className='relative'>
            <input
              className='shadow h-[25px] text-sm pl-2 appearance-none border rounded border-gray-800 focus:border-primary text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              id='textInput'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Enter name...'
            />
            <div
              className='absolute top-[5px] right-[8px] stroke-gray-800 lg:hover:stroke-gray-400 lg:hover:cursor-pointer'
              onClick={() => setName('')}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                className='w-4 h-4'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
              </svg>
            </div>
          </div>
        </div>
        <button
          aria-label='Clear characters selection'
          className='text-gray-800 text-md font-bold border-[1px] border-gray-800 rounded-md p-2 lg:hover:bg-gray-800 lg:hover:text-gray-300 transition-all'
          onClick={() => handleClearSelection()}>
          Clear characters selection
        </button>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-between mt-4 gap-4'>
        {charactersLists.map((list, index) => (
          <div
            className='border-[1px] border-gray-800 rounded-md p-4 md:min-h-[260px] lg:min-h-[200px] w-full'
            key={index}>
            <div className='flex flex-row gap-4 items-center'>
              <h3 className='text-gray-800 font-bold text-xl'>Character #{index + 1}</h3>
            </div>
            {list.length === 0 ? (
              <p className='text-red-600 pt-4'>There are no more characters with {name} in it&apos;s name</p>
            ) : (
              <div className='grid grid-cols-2 gap-2 lg:gap-4 mt-4'>
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharactersSection;
