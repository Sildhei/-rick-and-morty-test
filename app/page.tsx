import { getAllCharacters } from "./api/getAllCharacters";
import MainSection from "./components/MainSection/MainSection";

export default async function Home() {
  
  const characters = await getAllCharacters()
 
  return (
    <div className="bg-gray-300">
      <MainSection characters={characters} />
    </div>
  );
}
