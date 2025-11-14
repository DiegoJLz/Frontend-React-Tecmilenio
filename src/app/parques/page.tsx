// src/app/parques/page.tsx (CÓDIGO FINAL DE PARQUES)
import ParkCard from '@/components/views/ParkCard';
import { parkItems, ParkItem } from '@/lib/data';
import { Trees } from 'lucide-react';

async function getParksData(): Promise<ParkItem[]> {
    // Aquí podrías hacer fetch('https://api.tuproyecto.com/parks')
    return parkItems; 
}

export default async function ParquesPage() {
    const parks = await getParksData();

    return (
        <div className="py-8 animate-fadeIn bg-white p-6 rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold text-teal-800 mb-8 border-b-4 border-amber-400 pb-2 flex items-center">
                <Trees size={40} className="mr-2 text-teal-600"/>
                Parques y Maravillas Naturales en México
            </h1>
            
            <p className="text-lg text-gray-700 mb-10">
                Explora nuestra selección de los mejores parques y áreas naturales de distintos estados del país, incluyendo Jalisco, Ciudad de México y Nuevo León.
            </p>

            {/* Agrupación dinámica por Estado */}
            {Array.from(new Set(parks.map(p => p.location))).map(location => (
                <div key={location} className="mb-12">
                    <h2 className="text-3xl font-bold text-teal-700 mb-6 py-2 border-b-2 border-teal-300">
                        📍 {location.replace('_', ' ')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {parks.filter(p => p.location === location).map(park => (
                            <ParkCard key={park.id} park={park} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}