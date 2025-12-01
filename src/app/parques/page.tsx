import React from 'react';
import { MOCK_EXPERIENCES } from '@/lib/data'; // Usamos la nueva data maestra
import ExperienceCard from '@/components/ui/ExperienceCard'; // Usamos la tarjeta estándar
import { Trees } from 'lucide-react';

export default function ParquesPage() {
  // Filtramos solo las experiencias que sean de categoría 'Naturaleza'
  const parkExperiences = MOCK_EXPERIENCES.filter(exp => 
    exp.category?.name.includes('Naturaleza') || 
    exp.category?.name.includes('Parque')
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Encabezado de la Sección */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-green-100 rounded-full">
            <Trees className="w-8 h-8 text-green-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Parques y Naturaleza</h1>
            <p className="text-gray-600 mt-1">Explora los pulmones verdes y reservas naturales de la región.</p>
          </div>
        </div>

        {/* Grid de Resultados */}
        {parkExperiences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {parkExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No encontramos parques disponibles por el momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}