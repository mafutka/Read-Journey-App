import Header from "../components/Header/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import css from "./protected.module.css";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/register");
  }

  return (
    <div className={css.container}>
      <Header />
      {children}
    </div>
  );
}
