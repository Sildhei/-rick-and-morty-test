'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({ totalPages, name }: { totalPages: number; name: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';

  const handleOnPrevPage = () => {
    let url = `/?page=${Number(page) - 1}`;
    if (name) {
      url += `&name=${name}`;
    }
    router.push(url, {
      scroll: false,
    });
  };

  const handleOnNextPage = () => {
    let url = `/?page=${Number(page) + 1}`;
    if (name) {
      url += `&name=${name}`;
    }
    router.push(url, {
      scroll: false,
    });
  };

  const handleOnFirstPage = () => {
    let url = '/?page=1';
    if (name) {
      url += `&name=${name}`;
    }
    router.push(url, {
      scroll: false,
    });
  };

  const handleOnLastPage = () => {
    let url = `/?page=${totalPages}`;
    if (name) {
      url += `&name=${name}`;
    }
    router.push(url, {
      scroll: false,
    });
  };

  return (
    <div className='flex flex-row items-center justify-center gap-6 my-6 w-full md:w-[350px] border-[1px] border-gray-800 rounded-md p-1 mx-auto'>
      <button
        disabled={Number(page) === 1}
        onClick={() => handleOnFirstPage()}
        className={`${Number(page) === 1 && 'cursor-not-allowed'}`}>
        <svg
          width='20px'
          height='20px'
          viewBox='0 0 24 24'
          fill='none'
          className={`${Number(page) !== 1 ? 'stroke-gray-800' : 'stroke-gray-400'} lg:hover:stroke-gray-400`}>
          <path
            d='M5 4V20M19 7.329V16.671C19 17.7367 19 18.2696 18.7815 18.5432C18.5916 18.7812 18.3035 18.9197 17.9989 18.9194C17.6487 18.919 17.2327 18.5861 16.4005 17.9204L10.5617 13.2494C10.0279 12.8223 9.76097 12.6088 9.66433 12.3508C9.5796 12.1246 9.5796 11.8754 9.66433 11.6492C9.76097 11.3912 10.0279 11.1777 10.5617 10.7506L16.4005 6.07961C17.2327 5.41387 17.6487 5.081 17.9989 5.08063C18.3035 5.0803 18.5916 5.21876 18.7815 5.45677C19 5.73045 19 6.2633 19 7.329Z'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <button
        className={`text-lg ${Number(page) !== 1 ? 'text-gray-800' : 'text-gray-400'} ${
          Number(page) !== 1 && 'hover:text-gray-400'
        } ${Number(page) === 1 && 'cursor-not-allowed text-gray-400'} `}
        onClick={() => handleOnPrevPage()}
        disabled={Number(page) === 1}>
        <div className='flex flex-row items-center gap-2'>
          <svg fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
          </svg>
          <p> Prev</p>
        </div>
      </button>
      <p className='text-gray-800 text-lg font-bold' data-testid='page-number'>
        {page} of {totalPages}
      </p>
      <button
        className={`text-lg ${Number(page) !== totalPages ? 'text-gray-800' : 'text-gray-400'} ${
          Number(page) !== totalPages && 'hover:text-gray-400'
        } ${Number(page) === totalPages && 'cursor-not-allowed'} `}
        onClick={() => handleOnNextPage()}
        disabled={Number(page) === totalPages}>
        <div className='flex flex-row items-center gap-2'>
          <p> Next</p>
          <svg fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
          </svg>
        </div>
      </button>
      <button
        disabled={Number(page) === totalPages}
        onClick={() => handleOnLastPage()}
        className={`${Number(page) === totalPages && 'cursor-not-allowed'}`}>
        <svg
          width='20px'
          height='20px'
          viewBox='0 0 24 24'
          fill='none'
          className={`${Number(page) !== totalPages ? 'stroke-gray-800' : 'stroke-gray-400'} lg:hover:stroke-gray-400`}>
          <path
            d='M19 20V4M5 16.671V7.329C5 6.2633 5 5.73045 5.21846 5.45677C5.40845 5.21876 5.69654 5.0803 6.00108 5.08063C6.35125 5.081 6.76734 5.41387 7.59951 6.07961L13.4383 10.7506C13.9721 11.1777 14.239 11.3912 14.3357 11.6492C14.4204 11.8754 14.4204 12.1246 14.3357 12.3508C14.239 12.6088 13.9721 12.8223 13.4383 13.2494L7.59951 17.9204C6.76734 18.5861 6.35125 18.919 6.00108 18.9194C5.69654 18.9197 5.40845 18.7812 5.21846 18.5432C5 18.2695 5 17.7367 5 16.671Z'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
