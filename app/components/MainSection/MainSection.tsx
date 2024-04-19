import { IExtendedCharacterData } from "@/app/api/getAllCharacters";
import CharactersSection from "../CharactersSection/CharactersSection";
import Container from "../commons/Container";

export type CharactersProps = {
  characters: IExtendedCharacterData;
};

const MainSection = ({ characters }: CharactersProps) => {
  return (
    <div className="py-4">
      <Container>
        <CharactersSection characters={characters} />
      </Container>
    </div>
  );
};

export default MainSection;
