import { getAllCharacters } from './api/getAllCharacters';
import ErrorComponent from './components/Error/ErrorComponent';
import MainSection from './components/MainSection/MainSection';

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const paramPage = searchParams['page'] ?? '1';
  const paramName = searchParams['name'] ?? ''

  const characters = await getAllCharacters({ page: Number(paramPage), name: paramName });

  if (isNaN(Number(paramPage))) {
    return <ErrorComponent message='Invalid Url' />;
  }

  return (
    <div className='bg-gray-300'>
      <MainSection characters={characters} paramName={paramName} paramPage={paramPage} />
    </div>
  );
}
