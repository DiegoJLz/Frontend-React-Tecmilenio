import Link from 'next/link';
import ImageCard from '@/components/ui/ImageCard'; 
import { tourItems, TourItem, secondaryColor } from '@/lib/data'; 
import { MapPin, Tag, Anchor } from 'lucide-react';

async function getTourData(): Promise<TourItem[]> {
    return tourItems; 
}

export default async function ToursPage() {
    const tours = await getTourData();

    return (
        <div className="py-8 animate-fadeIn bg-white p-6 rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold text-teal-800 mb-8 border-b-4 border-amber-400 pb-2 flex items-center">
                <Anchor size={40} className="mr-2 text-teal-600"/>
                Tours Imprescindibles en México
            </h1>
            
            {/* ... (Banner de filtro) ... */}

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.map((item) => (
                    // La interactividad está en el Link (es un Server Component seguro)
                    <div key={item.id} className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.03] group cursor-pointer">
                        
                        <Link href={`/tours/${item.id}`}>
                            <ImageCard 
                                title={item.title} 
                                description={item.description}
                                imageUrl={item.imageUrl}
                            />
                        </Link>

                        {/* ... (Indicador de Ubicación y Oferta) ... */}
                    </div>
                ))}
            </section>
        </div>
    );
}