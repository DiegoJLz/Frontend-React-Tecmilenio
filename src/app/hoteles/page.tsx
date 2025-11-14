// src/app/hoteles/page.tsx
import ImageCard from '@/components/ui/ImageCard'; 
import { MapPin, Star, Hotel } from 'lucide-react';

export default function HotelesExplorerView() {
    return (
        <div className="py-8 animate-fadeIn bg-white p-6 rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold text-teal-800 mb-8 border-b-4 border-amber-400 pb-2 flex items-center">
                <Hotel size={40} className="mr-2 text-teal-600"/>
                Hoteles Explorer: Estancias de Lujo
            </h1>
            
            {/* Tarjeta de Hotel 1: Hard Rock */}
            <div className="mb-10 p-6 bg-teal-50 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-teal-700 mb-2">Hard Rock Hotel Guadalajara</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                        <p className="text-base text-gray-700 mb-4">
                            Su diseño moderno y su ambiente vibrante lo convierten en una opción ideal tanto para viajeros de negocios como para turistas.
                        </p>
                        <div className="text-sm text-gray-600 space-y-3">
                            <p className="flex items-start"><MapPin size={18} className="text-amber-500 mr-2 mt-1 flex-shrink-0" /><span className="font-semibold">Ubicación:</span> Situado en la Avenida Vallarta, con fácil acceso a Expo Guadalajara y La Gran Plaza Fashion Mall.</p>
                            <p className="flex items-start"><Star size={18} className="text-amber-500 mr-2 mt-1 flex-shrink-0" /><span className="font-semibold">Opiniones:</span> Huéspedes destacan la limpieza, el confort y la atención al detalle.</p>
                        </div>
                    </div>
                    <div className="lg:col-span-1 grid grid-cols-1 gap-4">
                        <ImageCard title="Exterior" description="" imageUrl="https://placehold.co/600x400/004D40/ffffff?text=Hard+Rock+Exterior"/>
                    </div>
                </div>
            </div>

            {/* Tarjeta de Hotel 2: Rio Hotel */}
            <div className="p-6 bg-yellow-50 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-teal-700 mb-2">Rio Hotel Guadalajara</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                        <p className="text-base text-gray-700 mb-4">
                            Elegante hotel de 5 estrellas ubicado en la zona de Chapalita. Destaca por su arquitectura moderna y su ubicación estratégica.
                        </p>
                        <div className="text-sm text-gray-600 space-y-3">
                            <p className="flex items-start"><MapPin size={18} className="text-amber-500 mr-2 mt-1 flex-shrink-0" /><span className="font-semibold">Ubicación:</span> Cerca de Expo Guadalajara, La Minerva y el World Trade Center.</p>
                        </div>
                    </div>
                    <div className="lg:col-span-1 grid grid-cols-1 gap-4">
                        <ImageCard title="Exterior" description="" imageUrl="https://placehold.co/600x400/00796B/ffffff?text=Rio+Hotel+Exterior"/>
                    </div>
                </div>
            </div>
        </div>
    );
}