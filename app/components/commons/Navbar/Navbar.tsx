import Image from 'next/image';
import Link from 'next/link';
import Container from '../Container';

const Navbar = () => {
  return (
    <nav className='bg-gray-800'>
      <Container>
        <div className='flex flex-row justify-center py-4'>
          <Link href={`/?page=1&name=`}>
            <div className='relative w-[300px] h-[70px]'>
              <Image
                priority
                src='/logo.svg'
                alt='Logo'
                fill
                style={{
                  objectFit: 'fill',
                }}
                className='absolute top-0 right-0 bottom-0 left-0'
              />
            </div>
          </Link>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
