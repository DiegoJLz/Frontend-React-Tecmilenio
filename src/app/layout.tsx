// src/app/layout.tsx (CÓDIGO FINAL LIMPIO Y CORREGIDO)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";

// Importaciones de diseño
import Header from '@/components/layout/Header'; 
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { secondaryColor } from '@/lib/data'; 

// Definiciones de las fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'TECMYPROJECT - Viajes Inolvidables', 
  description: "Explora los mejores tours y paquetes de México.", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Es CRUCIAL que el body comience inmediatamente después de <html>
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className={`antialiased min-h-screen font-sans ${secondaryColor}`}
      >
        <Header />
        <NavBar /> 
        
        <main className="container mx-auto px-4 py-8">
            {children} 
        </main>
        
        <Footer />
      </body>
    </html>
  );
}