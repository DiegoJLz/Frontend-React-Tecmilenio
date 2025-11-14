// src/components/views/DiscountCard.tsx (CÓDIGO FINAL CORREGIDO)
import React from 'react';
import Link from 'next/link'; 
import { IconMap } from '@/lib/data';

interface DiscountCardProps {
    title: string;
    discount: string;
    details: string;
    imageUrl: string;
    bgColor: string;
    linkTo: string;
    icon: string; // Nombre del icono como string
}

const DiscountCard: React.FC<DiscountCardProps> = ({ title, discount, details, imageUrl, bgColor, linkTo, icon }) => {
    const Icon = IconMap[icon] || IconMap['Anchor']; 

    return (
        <div className={`rounded-xl shadow-xl p-6 flex flex-col items-center text-center text-white ${bgColor} transition transform hover:scale-[1.02] duration-300 min-h-[450px]`}>
            <Icon size={40} className="text-amber-400 mb-4"/>
            <h3 className="text-2xl font-extrabold mb-2">{title}</h3>
            <p className="text-4xl font-black text-amber-400 mb-4">{discount}</p>
            <p className="text-sm italic mb-4 flex-grow">{details}</p>
            <div className="w-full h-36 mb-4 overflow-hidden rounded-lg shadow-md">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    // CRÍTICO: Eliminamos la prop onError para que sea seguro en Server Components
                    // onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                    //     e.currentTarget.onerror = null; 
                    //     e.currentTarget.src="https://placehold.co/400x300/10B981/ffffff?text=Imagen+Paquete"; 
                    // }}
                />
            </div>
            <Link 
                href={linkTo} 
                className="mt-auto w-full bg-amber-400 text-teal-800 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-500 transition transform hover:scale-[1.05]"
            >
                Ver Detalles
            </Link>
        </div>
    );
}

export default DiscountCard;