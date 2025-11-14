// src/lib/data.ts
import React from 'react';
import { Anchor, Trees, Globe, Hotel, Car, Plane } from 'lucide-react';

// --- TIPOS Y COLORES ---
export type LocationState = 'JALISCO' | 'CDMX' | 'QUINTANA_ROO' | 'NUEVO_LEON' | 'OTROS';

export interface TourItem {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    location: LocationState;
    imageUrl: string;
    duration: string;
    price: number;
    offer: {
        active: boolean;
        discount: string;
        details: string;
    };
}

export interface ParkItem {
    id: string;
    title: string;
    location: LocationState;
    description: string;
    details: string[]; 
    imageUrl: string;
}

interface PackageItem {
    title: string;
    discount: string;
    details: string;
    imageUrl: string;
    bgColor: string;
    icon: string;
}

export const primaryColor = 'bg-teal-700'; 
export const secondaryColor = 'bg-amber-400';
export const tertiaryColor = 'bg-teal-600';

// --- ICON MAP ---
export const IconMap: { [key: string]: React.ElementType } = {
    Anchor: Anchor,
    Trees: Trees,
    Globe: Globe,
    Hotel: Hotel,
    Car: Car,
    Plane: Plane,
};

// --- DATA: CAROUSEL, TOURS, PARQUES Y PAQUETES (USANDO MULTI-ESTADO) ---
export const heroCarouselImages: TourItem[] = [
    { id: 'chapala-hero', title: "Lago de Chapala", description: "¡Descubre la magia y la serenidad de la Ribera de Chapala!", longDescription: "El Lago de Chapala es el más grande de México...", location: 'JALISCO', imageUrl: "images/chapala_1.jpg", duration: "Día completo", price: 1200, offer: { active: true, discount: "25% de Descuento", details: "Tour de lancha de cortesía..." } }, 
    { id: 'guachimontones-hero', title: "Guachimontones", description: "¡Descubre la asombrosa Maravilla de Guachimontones en Jalisco!", longDescription: "La zona arqueológica de Guachimontones, con sus singulares pirámides circulares...", location: 'JALISCO', imageUrl: "https://placehold.co/1200x500/004D40/ffffff?text=Pir%C3%A1mides+Guachimontones", duration: "Medio día", price: 950, offer: { active: false, discount: "", details: "" } },
    { id: 'vallarta-hero', title: "Puerto Vallarta", description: "¡Descubre la inigualable Maravilla de Puerto Vallarta, Jalisco!", longDescription: "Puerto Vallarta es el destino de playa ideal...", location: 'JALISCO', imageUrl: "https://placehold.co/1200x500/26A69A/ffffff?text=Malec%C3%B3n+Vallarta", duration: "3 días / 2 noches", price: 4500, offer: { active: true, discount: "Noche de Hotel GRATIS", details: "Reserva un paquete de 3 noches..." } },
];

export const tourItems: TourItem[] = [
    { id: 'puente', title: "Puente Matute Remus (Atirantado)", description: "Recorrido nocturno con vistas impresionantes de la ciudad.", longDescription: "El Puente Atirantado Matute Remus no es solo una obra de ingeniería moderna...", location: 'JALISCO', imageUrl: "https://placehold.co/800x600/00897B/ffffff?text=Puente+Atirantado", duration: "3 horas", price: 850, offer: { active: true, discount: "20% OFF", details: "Aplica en reservaciones de Lunes a Jueves." } },
    { id: 'teatro', title: "Teatro Degollado", description: "Arquitectura clásica y tour cultural en el corazón de Guadalajara.", longDescription: "Sumérgete en la rica historia cultural de Jalisco con una visita guiada al majestuoso Teatro Degollado...", location: 'JALISCO', imageUrl: "https://placehold.co/800x600/00695C/ffffff?text=Teatro+Degollado", duration: "2 horas", price: 600, offer: { active: false, discount: "", details: "" } },
    { id: 'tacos', title: "Tacos al Pastor", description: "Tour gastronómico y degustación de los mejores tacos de la ciudad.", longDescription: "¡Prepárate para una explosión de sabor! Este tour te lleva por los rincones más auténticos de Guadalajara...", location: 'JALISCO', imageUrl: "https://placehold.co/800x600/00897B/ffffff?text=Tacos+al+Pastor", duration: "2.5 horas", price: 550, offer: { active: true, discount: "2x1", details: "Válido para parejas que reserven este fin de semana." } },
    { id: 'museo-antropologia', title: "Museo de Antropología", description: "Recorrido guiado por las culturas prehispánicas de México.", longDescription: "Visita el icónico museo en Chapultepec...", location: 'CDMX', imageUrl: "https://placehold.co/800x600/1E88E5/ffffff?text=Museo+CDMX", duration: "4 horas", price: 750, offer: { active: false, discount: "", details: "" } },
];

export const parkItems: ParkItem[] = [
    { id: 'metropolitano', title: "Parque Metropolitano", location: 'JALISCO', description: "Vive la naturaleza en grande: ¡Aventura para toda la familia!", details: ["Áreas deportivas", "Lago artificial", "Ciclovías", "Actividades familiares."], imageUrl: "https://placehold.co/600x400/00796B/ffffff?text=Parque+Metropolitano" },
    { id: 'xcaret', title: "Parque Xcaret", location: 'QUINTANA_ROO', description: "Un paraíso natural y cultural frente al mar Caribe.", details: ["Ríos subterráneos", "Espectáculos nocturnos", "Playas y caletas", "Sitios arqueológicos."], imageUrl: "https://placehold.co/600x400/00A896/ffffff?text=Xcaret" },
    { id: 'chipinque', title: "Parque Chipinque", location: 'NUEVO_LEON', description: "Senderismo y vistas panorámicas de Monterrey y la Sierra Madre.", details: ["Observación de fauna", "Miradores", "Rutas de bicicleta de montaña."], imageUrl: "https://placehold.co/600x400/4CAF50/ffffff?text=Chipinque" },
    { id: 'bosque-chapultepec', title: "Bosque de Chapultepec", location: 'CDMX', description: "El parque urbano más grande de América Latina, con museos y lagos.", details: ["Castillo", "Museos", "Zoológico", "Paseos en bote."], imageUrl: "https://placehold.co/600x400/1E88E5/ffffff?text=Chapultepec" },
];

export const explorerPackages: PackageItem[] = [
    { title: "Crea tu paquete a tu medida", discount: "20% de descuento", details: "Elige hasta 4 parques o tours de nuestra selección premium.", imageUrl: "https://placehold.co/400x300/10B981/ffffff?text=Paquete+Personalizado", bgColor: "bg-teal-700", icon: "Anchor" },
    { title: "Experiencias que tu quieras escoger", discount: "35% de descuento", details: "Selecciona hasta 3 eventos culturales o de aventura por semana.", imageUrl: "https://placehold.co/400x300/10B981/ffffff?text=Experiencias+Semana", bgColor: "bg-teal-800", icon: "Trees" },
    { title: "Escoges las zonas arqueológicas de Jalisco", discount: "10% de descuento", details: "Explora la historia milenaria de Jalisco con acceso prioritario.", imageUrl: "https://placehold.co/400x300/10B981/ffffff?text=Zonas+Arqueol%C3%B3gicas", bgColor: "bg-teal-700", icon: "Globe" },
];

export const navLinks: { label: string; href: string }[] = [
    { label: "Paquete Explorer", href: "/paquetes" },
    { label: "Parques y Naturaleza", href: "/parques" }, 
    { label: "Tours Destacados", href: "/tours" }, 
    { label: "Hoteles Explorer", href: "/hoteles" },
    { label: "Promociones", href: "/promociones" },
    { label: "Prepara tu Viaje", href: "/viaje" },
];