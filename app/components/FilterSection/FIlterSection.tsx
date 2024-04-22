import { Dispatch, SetStateAction, useEffect } from 'react';
import { IEpisodeData } from '@/app/api/getCharacterEpisodes';
import { useRouter } from 'next/navigation';

interface FiltersProps {
  setSelectedCharacters: Dispatch<SetStateAction<{ id: number; name: string }[]>>;
  setEpisodes: Dispatch<SetStateAction<IEpisodeData[][]>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  paramPage: string;
}

const FilterSection = ({ setSelectedCharacters, setEpisodes, name, setName, paramPage }: FiltersProps) => {
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      setSelectedCharacters([]);
      setEpisodes([]);

      if (name !== '') {
        router.push(`/?page=${paramPage ?? '1'}&name=${name}`, {
          scroll: false,
        });
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [name, router]);

  const handleClearSelection = () => {
    setSelectedCharacters([]);
    setEpisodes([]);
  };

  return (
    <div className='flex flex-col gap-4 md:flex-row items-center justify-between'>
      <div className='flex flex-row items-center gap-2'>
        <p className='text-gray-800 font-bold text-lg'>Search by name</p>
        <div className='relative'>
          <input
            className='shadow h-[25px] text-sm pl-2 appearance-none border rounded border-gray-800 focus:border-primary text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            id='textInput'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Enter name...'
          />
          <div
            className='absolute top-[5px] right-[8px] stroke-gray-800 lg:hover:stroke-gray-400 lg:hover:cursor-pointer'
            onClick={() => {
              router.push(`/?page=1&name=`), setName('');
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              className='w-4 h-4'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
            </svg>
          </div>
        </div>
      </div>
      <button
        aria-label='Clear characters selection'
        className='text-gray-800 text-md font-bold border-[1px] border-gray-800 rounded-md p-2 lg:hover:bg-gray-800 lg:hover:text-gray-300 transition-all'
        onClick={() => handleClearSelection()}>
        Clear characters selection
      </button>
    </div>
  );
};

export default FilterSection;
