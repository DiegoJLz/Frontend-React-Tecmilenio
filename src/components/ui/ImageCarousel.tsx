// src/components/ui/ImageCarousel.tsx
"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import ImageCard from '@/components/ui/ImageCard'; 
import { TourItem } from '@/lib/data'; // <-- Asegúrate de que TourItem esté importado

// AGREGAR ESTA INTERFAZ AQUÍ
interface ImageCarouselProps {
    images: TourItem[];
    onImageClick: (tour: TourItem) => void;
}
// FIN DE LA INTERFAZ AGREGADA

const ImageCarousel: React.FC<ImageCarouselProps> = React.memo(({ images, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false); 

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    // ... (goToNext, goToPrevious logic)
    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, [images.length]);


    // Renderiza placeholder para prevenir el error de hidratación (SSR mismatch)
    if (!isMounted) {
        return <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl mb-12 bg-gray-200 animate-pulse" />;
    }

    return (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl mb-12">
            {images.length > 0 && (
                <ImageCard 
                    title={images[currentIndex].title}
                    description={images[currentIndex].description}
                    imageUrl={images[currentIndex].imageUrl}
                    onClick={() => onImageClick(images[currentIndex])}
                />
            )}
            <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-amber-400" aria-label="Imagen anterior">
                <ChevronLeft size={24} />
            </button>
            <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-amber-400" aria-label="Imagen siguiente">
                <ChevronRight size={24} />
            </button>
        </div>
    );
});
ImageCarousel.displayName = 'ImageCarousel';
export default ImageCarousel;