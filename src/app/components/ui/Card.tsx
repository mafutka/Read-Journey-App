export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#1c1c1e] p-8 rounded-3xl w-full max-w-[400px]">
      {children}
    </div>
  );
};