import ImageCard from '@/components/ui/ImageCard'; 
import { ShoppingBag, Tag } from 'lucide-react';

export default function PromocionesView() {
    return (
        <div className="py-8 animate-fadeIn bg-white p-6 rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold text-teal-800 mb-8 border-b-4 border-amber-400 pb-2 flex items-center">
                <Tag size={40} className="mr-2 text-teal-600"/>
                Promociones y Descuentos Exclusivos
            </h1>
            
            {/* Promoción 1: KRYSTAL TRAVEL */}
            <div className="mb-8 p-6 bg-teal-50 rounded-xl shadow-md grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                <div className="lg:col-span-3">
                    <h2 className="text-2xl font-bold text-teal-700 mb-2">KRYSTAL® TRAVEL FEST</h2>
                    <p className="text-base text-gray-700 mb-3">
                        Hasta 45% de descuento, 4ta noche gratis, y 15% en alimentos y bebidas.
                    </p>
                    <button className="bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition flex items-center">
                        <ShoppingBag size={20} className="mr-2"/> Comprar
                    </button>
                </div>
                <ImageCard title="KRYSTAL" description="" imageUrl="https://placehold.co/400x300/004D40/ffffff?text=Hotel+Krystal" className="lg:col-span-1 h-full"/>
            </div>
            
            {/* ... (Promoción 2) ... */}
            <div className="mb-8 p-6 bg-yellow-50 rounded-xl shadow-md grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                <div className="lg:col-span-3">
                    <h2 className="text-2xl font-bold text-teal-700 mb-2">Hotel Solar de las Ánimas (Tequila, Jalisco)</h2>
                    <p className="text-base text-gray-700 mb-3">
                        "Fines de Semana Exclusivos" Estancia con desayuno incluido para dos adultos; tarifa especial viernes y sábado.
                    </p>
                    <button className="bg-red-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-700 transition flex items-center">
                        <ShoppingBag size={20} className="mr-2"/> Comprar
                    </button>
                </div>
                <ImageCard title="Solar de las Ánimas" description="" imageUrl="https://placehold.co/400x300/00796B/ffffff?text=Solar+de+las+%C3%81nimas" className="lg:col-span-1 h-full"/>
            </div>
        </div>
    );
}