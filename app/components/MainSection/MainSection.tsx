'use client'

import { useState } from 'react';
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
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);
  const [episodes, setEpisodes] = useState<IEpisodeData[][]>([])

  return (
    <div className='py-8'>
      <Container>
        <CharactersSection
          characters={characters}
          selectedCharacters={selectedCharacters}
          setSelectedCharacters={setSelectedCharacters}
          setEpisodes={setEpisodes}
        />
        <Pagination totalPages={characters.info.pages} />
        <EpisodesSection episodes={episodes}/>
      </Container>
    </div>
  );
};

export default MainSection;
