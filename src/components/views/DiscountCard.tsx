import React from 'react';
import Link from 'next/link';
import { Anchor, Trees, Globe, Tag, ArrowRight, Star } from 'lucide-react';
import { LandingHighlight } from '@/lib/data';

// 1. Mapa local de iconos: convierte el string 'Anchor' de la DB en el componente <Anchor />
const LocalIconMap: Record<string, React.ElementType> = {
  Anchor: Anchor,
  Trees: Trees,
  Globe: Globe,
  Tag: Tag,
  Star: Star
};

interface DiscountCardProps {
  highlight: LandingHighlight;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ highlight }) => {
  // Si no encuentra el icono, usa 'Tag' por defecto
  const Icon = (highlight.icon && LocalIconMap[highlight.icon]) ? LocalIconMap[highlight.icon] : Tag;

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition-transform hover:-translate-y-1 ${highlight.color_theme || 'bg-teal-700'}`}>
      
      {/* Icono gigante de fondo (Efecto visual) */}
      <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12">
        <Icon size={140} />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header de la tarjeta */}
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner">
             <Icon size={24} className="text-white" />
          </div>
          
          {highlight.badge_label && (
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
              {highlight.badge_label}
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="mb-6 flex-grow">
          <h3 className="text-2xl font-bold mb-2 leading-tight">{highlight.title}</h3>
          <p className="text-teal-50 text-sm font-medium opacity-90">{highlight.subtitle}</p>
          <p className="mt-3 text-white/80 text-sm line-clamp-3">
            {highlight.description}
          </p>
        </div>

        {/* Botón de Acción */}
        <Link
          href={highlight.cta_url}
          className="inline-flex items-center justify-center gap-2 w-full text-sm font-bold bg-white text-teal-900 px-4 py-3 rounded-lg hover:bg-teal-50 transition-colors"
        >
          {highlight.cta_label}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default DiscountCard;