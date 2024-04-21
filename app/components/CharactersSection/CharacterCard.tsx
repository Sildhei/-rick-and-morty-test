import { useMemo } from 'react';
import Image from 'next/image';
import { ICharacterData } from '@/app/api/getAllCharacters';

type CharacterProps = {
  character: ICharacterData;
  selectedCharacters: { id: number; name: string }[];
  index: number;
};

const CharacterCard = ({ character, selectedCharacters, index }: CharacterProps) => {
  const isDisabled = useMemo(() => {
    return index === 1 && selectedCharacters.length === 0;
  }, [index, selectedCharacters]);

  return (
    <div className='max-w-[300px] flex flex-col items-center lg:flex-row rounded-md relative group'>
      {isDisabled && <div className='absolute inset-0 bg-green-light z-10 opacity-30 min-w-[130px]' />}
      <div className='w-full h-[100px] rounded-t-md lg:w-[100px] lg:h-[120px] lg:rounded-tr-none lg:rounded-l-md relative overflow-hidden'>
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes='(min-width: 100px) 100vw'
          style={{
            objectFit: 'cover',
          }}
          className={`absolute top-0 right-0 left-0 bottom-0 transition-transform duration-300 transform ${
            !isDisabled && 'lg:group-hover:scale-125'
          }`}
        />
      </div>
      <div
        className={`p-2 lg:p-4 w-full h-[80px] lg:w-[200px] lg:h-[120px] ${
          selectedCharacters.find(selected => selected.id === character.id) ? 'bg-primary' : 'bg-gray-800'
        } ${
          !isDisabled && 'lg:group-hover:bg-primary'
        } rounded-b-md lg:rounded-bl-none lg:rounded-r-md transition-all`}>
        <p
          className={`font-bold line-clamp-2 leading-5 ${
            selectedCharacters.find(selected => selected.id === character.id) ? 'text-gray-800' : 'text-primary'
          } ${!isDisabled && 'lg:group-hover:text-gray-800'} transition-all`}>
          {character.name}
        </p>
        <div className='flex flex-row items-center gap-2 mt-2 overflow-hidden'>
          <div
            className={`h-[10px] min-w-[10px] rounded-full ${
              character.status === 'Alive' ? 'bg-green-700' : character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
            }`}
          />
          <p
            className={`text-[13px] line-clamp-2 ${
              selectedCharacters.find(selected => selected.id === character.id) ? 'text-gray-800' : 'text-green-light'
            } ${!isDisabled && 'lg:group-hover:text-gray-800'} transition-all`}>
            {character.status} - {character.species}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
