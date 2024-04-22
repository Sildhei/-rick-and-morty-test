'use client';

import { useEffect, useRef, useState } from 'react';
import { IExtendedCharacterData } from '@/app/api/getAllCharacters';
import CharactersSection from '../CharactersSection/CharactersSection';
import Container from '../commons/Container';
import Pagination from '../Pagination/Pagination';
import EpisodesSection from '../EpisodesSection/EpisodesSection';
import { IEpisodeData } from '@/app/api/getCharacterEpisodes';
import FilterSection from '../FilterSection/FIlterSection';
import ErrorComponent from '../Error/ErrorComponent';

export type CharactersProps = {
  characters: IExtendedCharacterData;
};

interface MainSectionProps extends CharactersProps{
  paramName: string
  paramPage: string
}

const MainSection = ({ characters, paramName, paramPage }: MainSectionProps) => {
  const [selectedCharacters, setSelectedCharacters] = useState<{ id: number; name: string }[]>([]);
  const [episodes, setEpisodes] = useState<IEpisodeData[][]>([]);
  const episodesSectionRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string>(paramName);

  useEffect(() => {
    if (selectedCharacters.length !== 2) {
      return;
    }
    if (episodesSectionRef.current) {
      episodesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [episodes]);

  return (
    <div className='py-8'>
      <Container>
        <FilterSection
          setSelectedCharacters={setSelectedCharacters}
          setEpisodes={setEpisodes}
          name={name}
          setName={setName}
          paramPage={paramPage}
        />
        {characters.error ? (
          <ErrorComponent message={characters.error} />
        ) : (
          <>
            <CharactersSection
              characters={characters}
              selectedCharacters={selectedCharacters}
              setSelectedCharacters={setSelectedCharacters}
              setEpisodes={setEpisodes}
              name={name}
          
            />
            <Pagination totalPages={characters.info.pages} />
            <div ref={episodesSectionRef}>
              <EpisodesSection episodes={episodes} selectedCharacters={selectedCharacters} />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default MainSection;
