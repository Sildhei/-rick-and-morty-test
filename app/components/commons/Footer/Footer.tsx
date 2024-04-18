import Container from "../Container";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-gray-800 pt-2">
      <Container>
        <div className="flex flex-row justify-between items-center">
        <Image src="/rick-and-morty.png" width={100} height={100} alt="Rick And Morty" />
        <p className="text-primary text-xs">©2024, Test utilizando The Rick And Morty App</p>
        </div>
      
      </Container>
    </div>
  );
};

export default Footer;
