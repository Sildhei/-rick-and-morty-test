'use client'

import { getCharactersAction } from '@/app/helpers/actions';
import Image from 'next/image';
import Link from 'next/link';

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <div className='bg-gray-300 h-[calc(100vh-201px)] my-auto'>
      <div className='flex flex-col h-full items-center justify-center'>
        <div className='flex flex-row items-center'>
          <Image src='/404-image.png' width={100} height={100} alt='Pickle Rick' />
          <div className='text-gray-800 ml-10 text-center'>
            <h3 className='text-7xl font-bold'>Error</h3>
            <p>Oops! {message}</p>
          </div>
        </div>
        <Link
          className='text-gray-800 text-xl mt-20 font-bold border-[1px] border-gray-800 rounded-md p-2 hover:bg-gray-800 hover:text-gray-300 transition-all'
          href={`/`}
          onClick={() => getCharactersAction(1)}>
          Go to page 1
        </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
