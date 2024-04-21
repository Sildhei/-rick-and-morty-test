'use client';

import { useEffect, useRef, useState } from 'react';
import { IExtendedCharacterData } from '@/app/api/getAllCharacters';
import CharactersSection from '../CharactersSection/CharactersSection';
import Container from '../commons/Container';
import Pagination from '../Pagination/Pagination';
import EpisodesSection from '../EpisodesSection/EpisodesSection';
import { IEpisodeData } from '@/app/api/getCharacterEpisodes';

export type CharactersProps = {
  characters: IExtendedCharacterData;
};

const MainSection = ({ characters }: CharactersProps) => {
  const [selectedCharacters, setSelectedCharacters] = useState<{ id: number; name: string }[]>([]);
  const [episodes, setEpisodes] = useState<IEpisodeData[][]>([]);
  const episodesSectionRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string>('');

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
        <CharactersSection
          characters={characters}
          selectedCharacters={selectedCharacters}
          setSelectedCharacters={setSelectedCharacters}
          setEpisodes={setEpisodes}
          name={name}
          setName={setName}
        />
        <Pagination totalPages={characters.info.pages} name={name} />
        <div ref={episodesSectionRef}>
          <EpisodesSection episodes={episodes} selectedCharacters={selectedCharacters} />
        </div>
      </Container>
    </div>
  );
};

export default MainSection;
