import React from 'react';
import Link from 'next/link';
import { Globe, Plane, Hotel, Clock, Sun, DollarSign, MapPin, Info } from 'lucide-react';
import { MOCK_EXPERIENCES } from '@/lib/data'; // Usamos la nueva data
import ExperienceCard from '@/components/ui/ExperienceCard'; // Usamos el componente tarjeta nuevo

// Componente local para tarjetas de información (Tips)
const InfoCard: React.FC<{ icon: React.ElementType; title: string; content: string }> = ({ icon: Icon, title, content }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
    <div className="p-3 bg-amber-100 rounded-full shrink-0">
      <Icon className="w-6 h-6 text-amber-600" />
    </div>
    <div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
    </div>
  </div>
);

export default function ViajePage() {
  // Filtramos las experiencias que NO sean parques (para mostrar Tours culturales, gastronomía, etc.)
  const tourExperiences = MOCK_EXPERIENCES.filter(exp => 
    !exp.category?.name.includes('Naturaleza') && 
    !exp.category?.name.includes('Parque')
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. HEADER DE LA SECCIÓN */}
      <div className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Prepara tu Próxima Aventura</h1>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto">
            Descubre los mejores tours guiados y consejos prácticos para disfrutar Jalisco al máximo.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* 2. TIPS DE VIAJE (InfoCards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <InfoCard 
            icon={Sun} 
            title="Mejor Temporada" 
            content="Jalisco tiene un clima excelente todo el año. Octubre a Mayo es ideal para evitar lluvias." 
          />
          <InfoCard 
            icon={DollarSign} 
            title="Presupuesto" 
            content="Tours desde $450 MXN. Aceptamos tarjetas en todas nuestras experiencias." 
          />
          <InfoCard 
            icon={Clock} 
            title="Reserva Anticipada" 
            content="Recomendamos reservar con 48 horas de antelación para asegurar tu lugar." 
          />
        </div>

        {/* 3. LISTADO DE TOURS */}
        <div className="flex items-center gap-2 mb-6">
          <Globe className="text-teal-600" />
          <h2 className="text-2xl font-bold text-gray-900">Tours Destacados</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tourExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </div>
  );
}