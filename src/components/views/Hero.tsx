// src/components/views/Hero.tsx (FINALIZADO)
import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
    imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ imageUrl }) => {
    return (
        <div className="relative h-[60vh] md:h-[70vh] w-full">
            <Image
                src={imageUrl}
                alt="Fondo de Jalisco Explorer"
                fill
                className="object-cover brightness-[.65]"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
                    Descubre Jalisco, sin límites.
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-light max-w-lg drop-shadow">
                    Reserva experiencias únicas, tours y aventuras locales al mejor precio.
                </p>

                <div className="bg-white p-2 md:p-4 rounded-xl shadow-2xl flex items-center max-w-xl w-full">
                    <Search className="text-gray-400 ml-2" size={24} />
                    <input
                        type="text"
                        placeholder="Busca un destino o actividad..."
                        className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
                    />
                    <Link
                        href="/search"
                        className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors hidden sm:block"
                    >
                        Buscar
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;