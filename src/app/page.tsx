"use client";
import Link from 'next/link'; // Importamos Link
import ImageCard from '@/components/ui/ImageCard';
import { heroCarouselImages, tourItems, secondaryColor } from '@/lib/data';
import dynamic from 'next/dynamic'; 

// Importación dinámica para prevenir errores de hidratación
const DynamicImageCarousel = dynamic(
    () => import('@/components/ui/ImageCarousel'),
    { ssr: false }
);

export default function HomePage() {
  
  // Función para manejar el clic del carrusel (ahora usa Link en el Carousel)
  const handleCarouselClick = (tourId: string) => {
    // Esto es solo un placeholder, el DynamicImageCarousel debe manejar el Link
    console.log(`Intentando navegar a /tours/${tourId}`);
  };

  return (
    <>
        {/* CAROUSEL HERO - Debe tener un manejador para la imagen activa */}
        {/* Nota: Asumimos que DynamicImageCarousel se ajustó para no usar useRouter internamente y que solo acepta props. */}
        <DynamicImageCarousel 
            images={heroCarouselImages} 
            // Pasamos una función simple, si el Carousel aún no funciona, el problema es interno de sus props
            onImageClick={(tour) => handleCarouselClick(tour.id)}
        />
        
        {/* ... (Texto de bienvenida) ... */}
        <section className={`${secondaryColor} text-teal-800 py-8 px-6 mb-12 rounded-xl shadow-lg`}>
            {/* ... */}
        </section>
        
        {/* SECCIÓN DE TOURS DESTACADOS (Funciona con Link) */}
        <div className={`${secondaryColor} py-4 px-6 mb-8 rounded-xl shadow-lg text-center`}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-800">
                Explorer los mejores tours de Guadalajara
            </h2>
        </div>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {tourItems.slice(0, 3).map((item) => (
                <div 
                    key={item.id} 
                    className="rounded-xl overflow-hidden shadow-lg border-4 border-black transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/50 hover:scale-[1.03] cursor-pointer"
                >
                    <Link href={`/tours/${item.id}`}>
                        <ImageCard 
                            title={item.title} 
                            description={item.description}
                            imageUrl={item.imageUrl}
                        />
                    </Link>
                </div>
            ))}
        </section>
    </>
  );
}