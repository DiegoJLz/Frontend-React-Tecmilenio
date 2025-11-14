import React from 'react';
import Link from 'next/link';
import DiscountCard from '@/components/views/DiscountCard'; // Importación correcta
import { explorerPackages, secondaryColor } from '@/lib/data';

export default function PaquetesPage() {
    
    const packages = explorerPackages;

    return (
        <div className="py-8 animate-fadeIn bg-white p-6 rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold text-teal-800 mb-6 border-b-4 border-amber-400 pb-2">
                💥 Paquete Explorer: Arma tu Aventura
            </h1>
            
            {/* ... (Banner de promoción) ... */}

            <h2 className="text-3xl font-bold text-teal-800 mb-8">Nuestras Opciones Flexibles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {packages.map((pkg, index) => (
                    <DiscountCard 
                        key={index} 
                        {...pkg} 
                        // El DiscountCard debe manejar el Link internamente de forma pura
                        linkTo={`/paquetes/${pkg.title.replace(/\s/g, '-').toLowerCase()}`} 
                    /> 
                ))}
            </div>
        </div>
    );
}