import Image from 'next/image';
import Link from 'next/link';
import Container from '../Container';

const Navbar = () => {
  return (
    <nav className='bg-gray-800'>
      <Container>
        <div className='flex flex-row justify-center py-4'>
          <Link href={`/`}>
            <Image src='/logo.svg' width={200} height={100} alt='Logo' />
          </Link>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
