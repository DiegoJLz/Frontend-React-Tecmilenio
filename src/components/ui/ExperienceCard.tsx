// src/components/ui/ExperienceCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react'; // Iconos bonitos
import { Experience } from '@/types'; // Importamos tu interfaz corregida

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  
  // Lógica para obtener la imagen principal
  // Buscamos la que tenga is_primary = true, si no, tomamos la primera, o un placeholder.
  const mainImage = experience.images?.find((img) => img.is_primary)?.image_url 
    || experience.images?.[0]?.image_url 
    || 'https://placehold.co/600x400?text=No+Image';

  // Formateador de moneda simple
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      
      {/* 1. SECCIÓN DE IMAGEN */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        <Image
          src={mainImage}
          alt={experience.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge de Categoría (Flotante) */}
        {experience.category && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
            {experience.category.name}
          </span>
        )}
      </div>

      {/* 2. CONTENIDO */}
      <div className="flex flex-col flex-grow p-4">
        
        {/* Ubicación */}
        {experience.location && (
          <div className="flex items-center text-gray-500 text-xs mb-2">
            <MapPin size={14} className="mr-1 text-teal-600" />
            <span className="truncate">
              {experience.location.city}, {experience.location.state}
            </span>
          </div>
        )}

        {/* Título (Link al detalle) */}
        <Link href={`/experience/${experience.slug}`} className="block group-hover:text-teal-700 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
            {experience.title}
          </h3>
        </Link>

        {/* Resumen corto */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {experience.summary}
        </p>

        {/* 3. FOOTER (Precio y Rating) */}
        <div className="flex items-center justify-between border-t pt-3 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Desde</span>
            <span className="text-lg font-bold text-teal-700">
               {formatPrice(experience.price_per_person, experience.currency)}
            </span>
          </div>

          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-bold text-gray-700">
              {experience.average_rating}
            </span>
            <span className="text-xs text-gray-400 ml-1">
              ({experience.review_count})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;