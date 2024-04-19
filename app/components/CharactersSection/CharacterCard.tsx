import { useMemo } from "react";
import Image from "next/image";
import { ICharacterData } from "@/app/api/getAllCharacters";

type CharacterProps = {
  character: ICharacterData;
  selectedCharacters: number[];
  index: number;
};

const CharacterCard = ({
  character,
  selectedCharacters,
  index,
}: CharacterProps) => {
  const isDisabled = useMemo(() => {
    return index === 1 && selectedCharacters.length === 0;
  }, [index, selectedCharacters]);

  return (
    <div className='max-w-[300px] flex flex-row rounded-md relative group'>
      {isDisabled && (
        <div className="absolute inset-0 bg-green-light z-10 opacity-30" />
      )}
      <div className="w-[100px] h-[120px] relative overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          layout="fill"
          objectFit="cover"
          className={`absolute top-0 right-0 left-0 bottom-0 rounded-l-md ransition-transform duration-300 transform ${
            !isDisabled && "group-hover:scale-125 group-hover:rounded-l-[40px]"
          }`}
        />
      </div>
      <div
        className={`p-4 w-[200px] ${
          selectedCharacters.includes(character.id)
            ? "bg-primary"
            : "bg-gray-800"
        } ${!isDisabled && "group-hover:bg-primary"} transition-all`}
      >
        <p
          className={`font-bold line-clamp-2 leading-5 ${
            selectedCharacters.includes(character.id)
              ? "text-gray-800"
              : "text-primary"
          } ${!isDisabled && "group-hover:text-gray-800"} transition-all`}
        >
          {character.name}
        </p>
        <p
          className={`text-[13px] mt-2 ${
            selectedCharacters.includes(character.id)
              ? "text-gray-800"
              : "text-green-light"
          } ${!isDisabled && "group-hover:text-gray-800"} transition-all`}
        >
          {character.status} - {character.species}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
