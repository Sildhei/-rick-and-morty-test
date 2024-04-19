const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4">
      {children}
    </div>
  );
};

export default Container;
