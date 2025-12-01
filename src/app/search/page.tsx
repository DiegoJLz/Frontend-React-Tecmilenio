// src/app/search/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Search, Loader, AlertTriangle } from 'lucide-react';

// Importaciones necesarias para la conexión al backend
import { ExperienceService, ExperienceFilters } from '@/services/experience.service';
import { Experience } from '@/types'; 
import { ApiError } from '@/lib/api';

import ExperienceCard from '@/components/ui/ExperienceCard';

export default function SearchPage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    
    // FIX: Corregimos la declaración de useState
    const [isLoading, setIsLoading] = useState(true); 
    
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ExperienceFilters>({}); 
    const [totalResults, setTotalResults] = useState(0); 

    // Efecto para cargar las experiencias del backend
    useEffect(() => {
        const fetchExperiences = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Llama al servicio paginado
                const response = await ExperienceService.getExperiencesPaginated(1, 12, filters);
                
                setExperiences(response.data); 
                // Asumimos que total_items viene en la respuesta paginada
                setTotalResults((response as any).total_items || response.data.length); 

            } catch (err) {
                const apiError = err as ApiError;
                setError(apiError.message || 'Error al cargar las experiencias. Verifica que el servidor esté activo.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperiences();
    }, [filters]); 

    
    // --- RENDERING CONDICIONAL ---
    
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12">
                <Loader className="w-12 h-12 text-teal-600 animate-spin mb-4" />
                <h1 className="text-xl text-gray-700">Explorando aventuras...</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                
                {/* Buscador Simple */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="¿Qué quieres descubrir hoy?" 
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            // Aquí se agregaría la lógica para actualizar el estado 'filters'
                        />
                    </div>
                    <button 
                        className="bg-teal-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition-colors"
                        // Aquí se agregaría la lógica de búsqueda, ej: onClick={() => setFilters({ q: searchValue })}
                    >
                        Buscar
                    </button>
                </div>

                {/* Mensajes de Error */}
                {error && (
                    <div className="p-4 mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-center gap-3">
                        <AlertTriangle size={20} />
                        <p className="font-semibold">{error}</p>
                    </div>
                )}

                {/* Resultados */}
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    {totalResults} {totalResults === 1 ? 'Resultado' : 'Resultados'}
                </h1>
                
                {experiences.length === 0 && !error ? (
                    <p className="text-gray-600 text-lg">No se encontraron experiencias que coincidan con tu búsqueda.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Mapeamos los datos reales del API */}
                        {experiences.map((experience) => (
                            <ExperienceCard key={experience.id} experience={experience} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}