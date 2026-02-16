import { AuthLayout } from "../components/auth/AuthLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}

console.log("AUTH LAYOUT RENDERED");