import React from 'react';

interface ImageCardProps {
    title: string;
    description: string;
    imageUrl: string;
    className?: string;
    // Quitamos 'onClick' y 'onError' del componente para hacerlo SEGURO en el servidor
}

const ImageCard: React.FC<ImageCardProps> = ({ title, description, imageUrl, className = '' }) => (
    <div 
        className={`relative w-full overflow-hidden rounded-xl shadow-lg transition-transform duration-300 group ${className}`}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover aspect-video group-hover:brightness-90 transition-all duration-300"
        // La propiedad onError debe ser eliminada del componente de imagen
        // para prevenir el error de runtime en Server Components.
        // Si una imagen falla, mostrará el texto "Imagen no disponible" del placeholder.
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
        <div className="text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
);

export default ImageCard;