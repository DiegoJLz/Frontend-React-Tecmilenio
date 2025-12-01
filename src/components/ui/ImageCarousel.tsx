'use client'; //
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Experience } from '@/types'; // Usamos la nueva interfaz

interface ImageCarouselProps {
  items: Experience[];
  autoPlay?: boolean;
  interval?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  items, 
  autoPlay = true, 
  interval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lógica de Autoplay
  useEffect(() => {
    if (!autoPlay || items.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl group">
      {/* Imágenes */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => {
          // Extraemos la imagen principal o usamos un placeholder
          const bgImage = item.images?.find(img => img.is_primary)?.image_url 
            || item.images?.[0]?.image_url 
            || '/placeholder.jpg';

          return (
            <div key={item.id} className="relative min-w-full h-full">
              <Image
                src={bgImage}
                alt={item.title}
                fill
                className="object-cover brightness-75"
                priority={true}
              />
              
              {/* Contenido sobre la imagen */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 bg-black/20">
                <span className="mb-2 px-3 py-1 bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider rounded-full">
                  {item.category?.name || 'Destacado'}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {item.title}
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md line-clamp-2">
                  {item.summary}
                </p>
                <Link 
                  href={`/experience/${item.slug}`}
                  className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flechas de Navegación */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicadores (Puntitos) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;