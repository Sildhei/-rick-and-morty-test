import Image from 'next/image';
import Container from '../Container';

const Navbar = () => {
  return (
    <nav className='bg-gray-800'>
      <Container>
        <div className='flex flex-row justify-center py-4'>
          <Image src='/logo.svg' width={200} height={100} alt='Logo' />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
