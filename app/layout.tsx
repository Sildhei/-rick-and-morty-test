import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/commons/Navbar/Navbar';
import Footer from './components/commons/Footer/Footer';

export const metadata: Metadata = {
  title: 'Rick And Morty - Test',
  description: 'Test utilizando The Rick and Morty API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
