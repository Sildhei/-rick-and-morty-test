import { useMemo } from 'react';
import Image from 'next/image';
import { ICharacterData } from '@/app/api/getAllCharacters';

type CharacterProps = {
  character: ICharacterData;
  selectedCharacters: number[];
  index: number;
};

const CharacterCard = ({ character, selectedCharacters, index }: CharacterProps) => {
  const isDisabled = useMemo(() => {
    return index === 1 && selectedCharacters.length === 0;
  }, [index, selectedCharacters]);

  return (
    <div className='max-w-[300px] flex flex-row rounded-md relative group'>
      {isDisabled && <div className='absolute inset-0 bg-green-light z-10 opacity-30' />}
      <div className='w-[100px] h-[120px] relative overflow-hidden'>
        <Image
          src={character.image}
          alt={character.name}
          layout='fill'
          objectFit='cover'
          className={`absolute top-0 right-0 left-0 bottom-0 rounded-l-md transition-transform duration-300 transform ${
            !isDisabled && 'group-hover:scale-125'
          }`}
        />
      </div>
      <div
        className={`p-4 w-[200px] ${selectedCharacters.includes(character.id) ? 'bg-primary' : 'bg-gray-800'} ${
          !isDisabled && 'group-hover:bg-primary'
        } rounded-r-md transition-all`}>
        <p
          className={`font-bold line-clamp-2 leading-5 ${
            selectedCharacters.includes(character.id) ? 'text-gray-800' : 'text-primary'
          } ${!isDisabled && 'group-hover:text-gray-800'} transition-all`}>
          {character.name}
        </p>
        <div className='flex flex-row items-center gap-2 mt-2'>
          <div
            className={`h-[10px] w-[10px] rounded-full ${
              character.status === 'Alive' ? 'bg-green-700' : character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
            }`}
          />
          <p
            className={`text-[13px] ${
              selectedCharacters.includes(character.id) ? 'text-gray-800' : 'text-green-light'
            } ${!isDisabled && 'group-hover:text-gray-800'} transition-all`}>
            {character.status} - {character.species}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
