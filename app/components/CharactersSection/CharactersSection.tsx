"use client";

import { useState } from "react";
import CharacterCard from "./CharacterCard";
import { getEpisodesIds } from "@/app/helpers/getEpisodesId";
import { CharactersProps } from "../MainSection/MainSection";
import { ICharacterData } from "@/app/api/getAllCharacters";

const CharactersSection = ({ characters }: CharactersProps) => {
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);

  const [charactersLists, setCharactersLists] = useState([
    characters.results.slice(0, 10),
    characters.results.slice(10, 20),
  ]);

  const handleOnClickCharacter = (character: ICharacterData, index: number) => {
    setSelectedCharacters((prev) => {
      const newSelectedCharacters = [...prev];
      newSelectedCharacters[index] = character.id;
      return newSelectedCharacters;
    });
    const episodesIds = getEpisodesIds(character.episode);
    console.log("epId2", episodesIds);
  };

  return (
    <div className="flex flex-row items-center justify-between pt-4">
      {charactersLists.map(
        (list, index) => (
          <div>
            <p className="text-gray-800 font-bold text-xl">
              Character #{index + 1}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4" key={list[0].name}>
              {list.map((character) => (
                <div
                  key={character.id}
                  role="button"
                  onClick={() =>
                    index === 1 && selectedCharacters.length === 0
                      ? null
                      : handleOnClickCharacter(character, index)
                  }
                  className={`${
                    index === 1 && selectedCharacters.length === 0
                      ? "cursor-not-allowed"
                      : null
                  }`}
                >
                  <CharacterCard
                    character={character}
                    selectedCharacters={selectedCharacters}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CharactersSection;
