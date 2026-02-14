import { RegisterForm } from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1c1c1e]">
      <div className="w-full max-w-md p-6 bg-[#2c2c2e] rounded-2xl">
        <RegisterForm />
      </div>
    </main>
  );
}