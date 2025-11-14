// src/components/layout/Header.tsx
import React from 'react';
import Link from 'next/link';
import { Search, User, Menu } from 'lucide-react';
import { tertiaryColor } from '@/lib/data';

const Header: React.FC = () => (
    <header className={`${tertiaryColor} text-white shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <Link href="/" className="text-3xl font-extrabold tracking-tight hover:text-amber-400 transition">TECMYPROJECT</Link>
                <span className="text-xs italic hidden sm:block">Viajes Inolvidables</span>
            </div>
            <div className="hidden lg:flex flex-grow max-w-lg mx-8 items-center bg-white rounded-full p-1 shadow-inner">
                <input type="text" placeholder="Escribe tu búsqueda aquí..." className="w-full px-4 py-1 text-gray-800 bg-transparent focus:outline-none"/>
                <button className="p-2 bg-amber-400 text-teal-800 rounded-full hover:bg-amber-500 transition duration-150"><Search size={20} /></button>
            </div>
            <div className="flex items-center space-x-4">
                <Link href="#" className="hidden sm:block text-sm font-medium hover:text-amber-400 transition">Preguntas frecuentes</Link>
                <Link href="/auth/login" className="flex items-center space-x-1 text-sm font-medium hover:text-amber-400 transition"><User size={20} /><span className="hidden md:inline">Tu cuenta</span></Link>
                <button className="lg:hidden p-2"><Menu size={24} /></button>
            </div>
        </div>
    </header>
);

export default Header;