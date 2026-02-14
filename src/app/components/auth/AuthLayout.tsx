import { Card } from "../ui/Card";

export const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141414] px-4">
      <Card>{children}</Card>
    </div>
  );
};