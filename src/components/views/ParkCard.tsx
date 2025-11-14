import React from 'react';
import { ParkItem, tertiaryColor } from '@/lib/data';
import { MapPin, Trees } from 'lucide-react';

interface ParkCardProps {
    park: ParkItem;
}

const ParkCard: React.FC<ParkCardProps> = ({ park }) => (
    // Componente de servidor/diseño, sin handlers de eventos
    <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-teal-100">
        <img
            src={park.imageUrl}
            alt={park.title}
            className="w-full h-48 object-cover"
            // No hay onError aquí, la imagen fallida mostrará el placeholder de la URL
        />
        <div className="p-6">
            <h3 className="text-2xl font-bold text-teal-800 mb-2">{park.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin size={16} className="text-amber-500 mr-1" />
                <span>{park.location.replace('_', ' ')}</span>
            </div>
            <p className="text-gray-700 italic mb-4">{park.description}</p>
            
            <h4 className="text-lg font-semibold text-teal-600 flex items-center mb-2">
                <Trees size={18} className="mr-2" />
                Atractivos:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-4">
                {park.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>

            <button className={`mt-6 w-full ${tertiaryColor} text-white py-2 px-6 rounded-full font-semibold hover:bg-teal-700 transition`}>
                Ver Ubicación
            </button>
        </div>
    </div>
);

export default ParkCard;