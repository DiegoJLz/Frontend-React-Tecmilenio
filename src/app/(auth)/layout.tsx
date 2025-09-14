import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticación - Local Experiences",
  description: "Inicia sesión o crea una cuenta en Local Experiences",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {children}
    </div>
  );
}
