// src/app/page.tsx
'use client'; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { MOCK_LANDING_HIGHLIGHTS, LandingHighlight } from '@/lib/data'; 
import { ExperienceService } from '@/services/experience.service';
import { Experience } from '@/types'; 
import { ApiError } from '@/lib/api';
// Asegúrate de que tu useAuth se importa correctamente, ya sea con o sin llaves
import { useAuth } from '@/hooks/useAuth'; // Ajustado para usar la exportación con llaves (export const useAuth)

import Hero from '@/components/views/Hero'; 
import ExperienceCard from '@/components/ui/ExperienceCard';
import DiscountCard from '@/components/views/DiscountCard';

export default function HomePage() {
    const router = useRouter();
    // Usamos la desestructuración del hook
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth(); 
    
    const [featuredExperiences, setFeaturedExperiences] = useState<Experience[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 🛑 Lógica de Protección de Ruta 🛑
    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            // Redirige al usuario a la página de login si no está autenticado
            router.replace('/login'); 
            // O a la ruta correcta si tu login está en /auth/login
        }
    }, [isAuthenticated, isAuthLoading, router]);


    // Lógica de Carga de Experiencias (Solo se ejecuta si isAuthenticated es true)
    useEffect(() => {
        if (isAuthenticated) {
            const fetchFeaturedExperiences = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const response = await ExperienceService.getExperiencesPaginated(1, 8); 
                    setFeaturedExperiences(response.data);
                } catch (err) {
                    const apiError = err as ApiError;
                    setError(apiError.message || 'Error al cargar experiencias destacadas. Revisa tu backend.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchFeaturedExperiences();
        }
    }, [isAuthenticated]); 

    
    // --- RENDERING CONDICIONAL ---

    // Muestra un spinner si está cargando la autenticación O si ya terminó y no está autenticado (antes de la redirección).
    if (isAuthLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader className="w-12 h-12 text-teal-600 animate-spin" />
            </div>
        );
    }
    
    // Si la autenticación es exitosa, pero la carga de datos aún no termina
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader className="w-12 h-12 text-teal-600 animate-spin" />
            </div>
        );
    }

    // El resto del JSX que ya tenías
    const heroImage = featuredExperiences[0]?.images?.[0]?.image_url || '/images/chapala.png';

    return (
        <main>
            {/* 1. Hero Section */}
            <Hero imageUrl={heroImage} />

            <div className="container mx-auto px-4 py-12">
                
                {/* Mensajes de Error */}
                {error && (
                    <div className="p-4 mb-8 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-center gap-3">
                        <AlertTriangle size={20} />
                        <p className="font-semibold">{error}</p>
                    </div>
                )}
                
                {/* 2. Experiencias Destacadas */}
                <section className="mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                        Aventuras cerca de ti
                    </h2>
                    
                    {featuredExperiences.length === 0 ? (
                        <p className="text-gray-600">No hay experiencias disponibles en este momento.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredExperiences.map((experience) => (
                                <ExperienceCard key={experience.id} experience={experience} />
                            ))}
                        </div>
                    )}
                    
                    <div className="text-center mt-8">
                        <Link 
                            href="/search" 
                            className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                        >
                            Ver el Catálogo Completo
                        </Link>
                    </div>
                </section>

                <hr className="my-12 border-gray-200" />
                
                {/* 3. Paquetes y Promociones (MOCK DATA) */}
                <section>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                        Planes y Paquetes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {MOCK_LANDING_HIGHLIGHTS.map((highlight: LandingHighlight) => (
                            <DiscountCard key={highlight.id} highlight={highlight} />
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}