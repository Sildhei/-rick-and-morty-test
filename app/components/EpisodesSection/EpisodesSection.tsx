import { useMemo } from 'react';
import Image from 'next/image';
import { IEpisodeData } from '@/app/api/getCharacterEpisodes';

interface EpisodesSectionProps {
  episodes: IEpisodeData[][];
  selectedCharacters: { id: number; name: string }[];
}

const EpisodesSection = ({ episodes, selectedCharacters }: EpisodesSectionProps) => {
  const parsedEpisodes = useMemo(() => {
    const newEpisodesArr = [...episodes];

    if (episodes.length === 0) {
      return;
    }

    const arr1 = episodes[0];
    const arr2 = episodes[1];

    if (!arr1 || !arr2) {
      return;
    }

    const combinedArray = [...arr1, ...arr2].filter((current, index, array) => {
      return index !== array.findIndex(item => item.id === current.id);
    });

    newEpisodesArr.splice(
      1,
      0,
      combinedArray.sort((a, b) => a.id - b.id)
    );

    return newEpisodesArr;
  }, [episodes]);

  return (
    <div>
      {parsedEpisodes ? (
        <div className='grid grid-cols-3 gap-4 mt-4 '>
          {parsedEpisodes.map((episodesList, index) => (
            <div className='border-[1px] border-gray-800 rounded-md p-4' key={index}>
              {index !== 1 ? (
                <p className='text-gray-800 font-bold'>
                  {selectedCharacters[index === 0 ? index : index - 1].name} - Only Episodes
                </p>
              ) : (
                <p className='text-gray-800 font-bold'>
                  {selectedCharacters[0].name} & {selectedCharacters[1].name} - Shared Episodes
                </p>
              )}
              <div className='w-full h-[1px] bg-gray-800 my-2' />
              {index === 1 && episodesList.length === 0 ? (
                <p className='text-red-600 text-xs'>These two characters don&apos;t share any episodes</p>
              ) : (
                <ul className='max-h-[300px] overflow-scroll'>
                  {episodesList.map(episode => (
                    <li key={episode.id} className='py-1'>
                      <p className='text-gray-800 text-xs'>
                        Episode #{episode.id} - {episode.name} - {episode.air_date}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center border-[1px] border-gray-800 rounded-md p-2 w-full max-w-[500px] mx-auto'>
          <p className='text-gray-800 text-lg font-bold'>Select two characters to see their episodes...</p>
          <div className='w-[300px] h-[350px] relative mt-4'>
            <Image
              src='/episodes-image.png'
              alt='Rick and Morty'
              layout='fill'
              objectFit='cover'
              className={`absolute top-0 right-0 left-0 bottom-0'
          }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodesSection;
