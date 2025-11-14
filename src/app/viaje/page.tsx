import Link from 'next/link';
import { Globe, Plane, Hotel, Clock, Sun, DollarSign, MapPin } from 'lucide-react';
import { secondaryColor, tertiaryColor, tourItems } from '@/lib/data'; // Importamos tours

// Componente para una tarjeta de información rápida
const InfoCard: React.FC<{ icon: React.ElementType, title: string, content: string }> = ({ icon: Icon, title, content }) => (
    <div className={`p-4 rounded-xl shadow-md ${secondaryColor} text-teal-800 flex items-center space-x-3`}>
        <Icon size={24} className="text-teal-700 flex-shrink-0" />
        <div>
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="text-xs">{content}</p>
        </div>
    </div>
);

export default function PreparaTuViajeView() {
    // Filtramos 3 tours que sean relevantes para planificar (ej: los de CDMX o Quintana Roo)
    const suggestedTours = tourItems.filter(t => t.location !== 'JALISCO').slice(0, 3);
    
    return (
        <div className="py-8 animate-fadeIn">
            <header className={`py-16 text-center bg-white rounded-xl shadow-xl mb-8 border-4 border-${tertiaryColor}`}>
                <Globe size={64} className="text-teal-600 mx-auto mb-4" />
                <h1 className="text-4xl font-extrabold text-teal-800 mb-2">✈️ Prepara tu Viaje</h1>
                <p className="text-xl text-gray-600">
                    Tu guía esencial para una experiencia perfecta en México.
                </p>
            </header>

            {/* 1. SECCIÓN DE INFORMACIÓN ESENCIAL */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-teal-800 mb-6 border-b-2 pb-2">Datos Clave para tu Estancia</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard icon={Sun} title="Clima Típico" content="Cálido y templado, consultar según el estado (20-30°C)." />
                    <InfoCard icon={Clock} title="Diferencia Horaria" content="GMT-6 o GMT-5 (según la temporada y estado)." />
                    <InfoCard icon={DollarSign} title="Moneda y Pagos" content="Peso Mexicano (MXN). Se acepta tarjeta en la mayoría de lugares turísticos." />
                </div>
            </section>

            {/* 2. SECCIÓN DE BÚSQUEDA Y ACCIÓN */}
            <section className={`p-8 rounded-xl shadow-2xl mb-12 bg-white border-2 border-amber-400`}>
                <h2 className="text-3xl font-black text-teal-800 mb-4">¡Todo en un solo lugar!</h2>
                <p className="text-lg text-gray-700 mb-6">Encuentra tu vuelo y alojamiento con nuestros partners exclusivos.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Botón de Vuelos */}
                    <button className="flex items-center justify-center space-x-3 bg-teal-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-teal-800 transition shadow-lg">
                        <Plane size={24} /> 
                        <span>Buscar Vuelos</span>
                    </button>
                    {/* Botón de Hoteles */}
                    <Link href="/hoteles" className="flex items-center justify-center space-x-3 bg-amber-400 text-teal-800 py-4 px-6 rounded-xl font-bold text-lg hover:bg-amber-500 transition shadow-lg">
                        <Hotel size={24} /> 
                        <span>Ver Hoteles Explorer</span>
                    </Link>
                </div>
            </section>

            {/* 3. SECCIÓN DE TOURS SUGERIDOS */}
            <section>
                <h2 className="text-2xl font-bold text-teal-800 mb-6 border-b-2 pb-2">Recomendaciones de Tours para Planificar</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {suggestedTours.map(tour => (
                        <div key={tour.id} className="p-4 bg-teal-50 rounded-xl shadow-md border border-teal-200">
                            <h3 className="font-bold text-teal-700">{tour.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{tour.description}</p>
                            <div className="flex items-center text-xs text-gray-500">
                                <MapPin size={14} className="mr-1" /> {tour.location.replace('_', ' ')}
                            </div>
                            <Link href={`/tours/${tour.id}`} className="mt-2 block text-sm text-amber-600 hover:text-amber-800 underline">
                                Ver Detalle →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}