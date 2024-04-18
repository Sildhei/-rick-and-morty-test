const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full max-w-[1300px] mx-auto px-10">
      {children}
    </div>
  );
};

export default Container;
