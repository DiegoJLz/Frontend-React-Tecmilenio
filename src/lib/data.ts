// src/lib/data.ts
import { 
    Experience, 
    Category, 
    ExperienceLocation, 
    User, 
    Review // Importamos Review
} from '@/types';
// Importamos TODOS los íconos necesarios para IconMap, Header y Footer
import { 
    MapPin, Users, Calendar, Anchor, Trees, Globe, Search, Clock, 
    DollarSign, ChevronLeft, ChevronRight, Plane, Hotel, Sun, 
    User as UserIcon, Menu // Añadidos Menu y UserIcon para el Header/Navbar
} from 'lucide-react';


// --- 1. DATOS AUXILIARES (Usuarios, Categorías, Ubicaciones) ---

const MOCK_HOST: User = {
    id: 'host-1',
    first_name: 'TecMy',
    last_name: 'Explorer',
    username: 'tecmymaster',
    email: 'contacto@tecmylexplorer.com',
    is_host: true,
    is_verified: true,
    created_at: new Date().toISOString(),
};

export const MOCK_CATEGORIES: Category[] = [
    { id: 'cat-nature', name: 'Naturaleza y Parques', icon_url: '/icons/trees.svg', created_at: new Date().toISOString() },
    { id: 'cat-culture', name: 'Cultura e Historia', icon_url: '/icons/museum.svg', created_at: new Date().toISOString() },
    { id: 'cat-adventure', name: 'Aventura', icon_url: '/icons/compass.svg', created_at: new Date().toISOString() },
    { id: 'cat-food', name: 'Gastronomía', icon_url: '/icons/food.svg', created_at: new Date().toISOString() },
    { id: 'cat-beach', name: 'Playa', icon_url: '/icons/sun.svg', created_at: new Date().toISOString() },
];

export const MOCK_LOCATIONS: Record<string, ExperienceLocation> = {
    GDL: { id: 'loc-gdl', city: 'Guadalajara', state: 'Jalisco', country: 'México', latitude: 20.6597, longitude: -103.3496, created_at: new Date().toISOString() },
    CHAPALA: { id: 'loc-chapala', city: 'Chapala', state: 'Jalisco', country: 'México', latitude: 20.2906, longitude: -103.1843, created_at: new Date().toISOString() },
    TEQUILA: { id: 'loc-tequila', city: 'Tequila', state: 'Jalisco', country: 'México', latitude: 20.8856, longitude: -103.8357, created_at: new Date().toISOString() },
    VALLARTA: { id: 'loc-pv', city: 'Puerto Vallarta', state: 'Jalisco', country: 'México', latitude: 20.6534, longitude: -105.2253, created_at: new Date().toISOString() },
    CDMX: { id: 'loc-cdmx', city: 'Ciudad de México', state: 'CDMX', country: 'México', latitude: 19.4326, longitude: -99.1332, created_at: new Date().toISOString() },
    MTY: { id: 'loc-mty', city: 'Monterrey', state: 'Nuevo León', country: 'México', latitude: 25.6866, longitude: -100.3161, created_at: new Date().toISOString() },
    CANCUN: { id: 'loc-cun', city: 'Cancún', state: 'Quintana Roo', country: 'México', latitude: 21.1619, longitude: -86.8515, created_at: new Date().toISOString() },
};

// --- MOCK USERS PARA COMENTARIOS ---
const MOCK_REVIEW_USERS: Record<string, User> = {
    ANA: { id: 'rev-user-1', first_name: 'Ana', last_name: 'García', username: 'anag', email: 'ana@example.com', is_host: false, is_verified: true, phone: '3310001000', created_at: new Date().toISOString() },
    BETO: { id: 'rev-user-2', first_name: 'Beto', last_name: 'Ramírez', username: 'betor', email: 'beto@example.com', is_host: false, is_verified: false, phone: '3310002000', created_at: new Date().toISOString() },
    CARLA: { id: 'rev-user-3', first_name: 'Carla', last_name: 'Soto', username: 'carlas', email: 'carla@example.com', is_host: false, is_verified: true, phone: '3310003000', created_at: new Date().toISOString() },
};

// --- MOCK REVIEWS ---
export const MOCK_REVIEWS: Review[] = [
    {
        id: 'rev-1', experience_id: 'exp-chapala', rating: 5, title: '¡Simplemente mágico!',
        comment: 'El atardecer en Chapala fue espectacular. El tour fue muy bien organizado, el guía excelente.',
        is_verified: true, created_at: '2025-10-15T10:00:00Z', author: MOCK_REVIEW_USERS.ANA,
    },
    {
        id: 'rev-2', experience_id: 'exp-guachimontones', rating: 4, title: 'Una maravilla histórica',
        comment: 'Las pirámides son fascinantes. Un poco largo el recorrido, pero vale totalmente la pena por la historia.',
        is_verified: true, created_at: '2025-11-01T14:30:00Z', author: MOCK_REVIEW_USERS.BETO,
    },
    {
        id: 'rev-3', experience_id: 'exp-chapala', rating: 4, title: 'Excelente servicio',
        comment: 'Muy buena experiencia, aunque el precio del almuerzo fue un poco alto.',
        is_verified: false, created_at: '2025-11-20T11:00:00Z', author: MOCK_REVIEW_USERS.CARLA,
    },
    {
        id: 'rev-4', experience_id: 'exp-tacos', rating: 5, title: '¡El mejor tour gastronómico!',
        comment: 'Soy de GDL pero descubrí nuevos lugares gracias a este tour. ¡Deliciosos y auténticos!',
        is_verified: true, created_at: '2025-11-25T11:00:00Z', author: MOCK_REVIEW_USERS.ANA,
    },
];


// --- 2. EXPERIENCIAS ---
export const MOCK_EXPERIENCES: Experience[] = [
    // --- JALISCO: TAPALPA (NUEVA EXPERIENCIA) ---
    {
        id: 'exp-tapalpa',
        title: 'Aventura en la Sierra de Tapalpa',
        slug: 'aventura-sierra-tapalpa',
        summary: 'Escapada a los bosques mágicos y cabañas de Tapalpa. ¡Pueblo Mágico!',
        description: 'Disfruta de la tranquilidad del Pueblo Mágico de Tapalpa. El paquete incluye transporte, paseo por el centro histórico, y una caminata guiada por el bosque y las famosas Piedras de Equipal.',
        price_per_person: 1800,
        currency: 'MXN',
        duration_hours: 10,
        difficulty_level: 2,
        max_participants: 12,
        min_participants: 4,
        average_rating: 4.9, 
        review_count: 55, 
        created_at: new Date().toISOString(),
        category: MOCK_CATEGORIES[2], 
        location: MOCK_LOCATIONS.GDL,
        host: MOCK_HOST,
        images: [{ id: 'img-tapalpa-1', image_url: '/images/sierra.png', is_primary: true, created_at: new Date().toISOString() }]
    },
    
    // --- JALISCO: EXISTENTES ---
    {
        id: 'exp-chapala',
        title: 'Lago de Chapala Mágico',
        slug: 'lago-chapala-magico',
        summary: '¡Descubre la magia y la serenidad de la Ribera de Chapala!',
        description: 'El Lago de Chapala es el más grande de México. Disfruta de un paseo en lancha, comida típica y un clima inigualable. Incluye visita a Ajijic.',
        price_per_person: 1200,
        currency: 'MXN',
        duration_hours: 8,
        difficulty_level: 1,
        max_participants: 20,
        min_participants: 2,
        average_rating: 4.8,
        review_count: 120,
        created_at: new Date().toISOString(),
        category: MOCK_CATEGORIES[0], 
        location: MOCK_LOCATIONS.CHAPALA,
        host: MOCK_HOST,
        images: [{ id: 'img-chap-1', image_url: '/images/chapala.png', is_primary: true, created_at: new Date().toISOString() }]
    },
    {
        id: 'exp-guachimontones',
        title: 'Pirámides de Guachimontones',
        slug: 'piramides-guachimontones',
        summary: '¡Descubre la asombrosa Maravilla arqueológica circular!',
        description: 'La zona arqueológica de Guachimontones es única en el mundo por sus pirámides circulares dedicadas al dios del viento Ehecatl.',
        price_per_person: 950,
        currency: 'MXN',
        duration_hours: 5,
        difficulty_level: 2,
        max_participants: 15,
        min_participants: 4,
        average_rating: 4.6,
        review_count: 45,
        created_at: new Date().toISOString(),
        category: MOCK_CATEGORIES[1], 
        location: MOCK_LOCATIONS.TEQUILA, 
        host: MOCK_HOST,
        images: [{ id: 'img-guachi-1', image_url: '/images/guachi.png', is_primary: true, created_at: new Date().toISOString() }]
    },
    {
        id: 'exp-vallarta',
        title: 'Escapada a Puerto Vallarta',
        slug: 'escapada-puerto-vallarta',
        summary: '3 días y 2 noches en la playa más bonita de Jalisco.',
        description: 'Puerto Vallarta es el destino ideal. Incluye hospedaje y tour por el malecón y los arcos.',
        price_per_person: 4500,
        currency: 'MXN',
        duration_hours: 72, 
        difficulty_level: 1,
        max_participants: 10,
        min_participants: 2,
        average_rating: 4.9,
        review_count: 230,
        created_at: new Date().toISOString(),
        category: MOCK_CATEGORIES[4], 
        location: MOCK_LOCATIONS.VALLARTA,
        host: MOCK_HOST,
        images: [{ id: 'img-pv-1', image_url: '/images/hotel1.png', is_primary: true, created_at: new Date().toISOString() }]
    },
    {
        id: 'exp-matute',
        title: 'Nocturno: Puente Matute Remus',
        slug: 'puente-matute-remus-tour',
        summary: 'Recorrido nocturno con vistas impresionantes de la ciudad.',
        description: 'El Puente Atirantado Matute Remus no es solo una obra de ingeniería, es un ícono de luz y modernidad en Guadalajara.',
        price_per_person: 850,
        currency: 'MXN',
        duration_hours: 3,
        difficulty_level: 1,
        max_participants: 10,
        min_participants: 2,
        average_rating: 4.2,
        review_count: 15,
        created_at: new Date().toISOString(),
        category: MOCK_CATEGORIES[2], 
        location: MOCK_LOCATIONS.GDL,
        host: MOCK_HOST,
        images: [{ id: 'img-matute-1', image_url: '/images/puente.png', is_primary: true, created_at: new Date().toISOString() }]
    },
    {
        id: 'exp-teatro',
        title: 'Teatro Degollado Backstage',
        slug: 'teatro-degollado-vip',
        summary: 'Arquitectura clásica y tour cultural en el corazón de GDL.',
        description: 'Sumérgete en la rica historia cultural de Jalisco con una visita guiada al majestuoso Teatro Degollado.',
        price_per_person: 600,
        currency: 'MXN',
        duration_hours: 2,
        difficulty_level: 1,
        max_participants: 20,
        min_participants: 1,
        average_rating: 4.7,
        review_count: 88,
        created_at: new Date().toISOString(),
        category: MOCK_CATEGORIES[1], 
        location: MOCK_LOCATIONS.GDL,
        host: MOCK_HOST,
        images: [{ id: 'img-teatro-1', image_url: '/images/Teatro_Degollado.png', is_primary: true, created_at: new Date().toISOString() }]
    },
    {
        id: 'exp-tacos',
        title: 'Ruta del Taco al Pastor',
        slug: 'ruta-tacos-gdl',
        summary: 'Tour gastronómico y degustación de los mejores tacos.',
        description: '¡Prepárate para una explosión de sabor! Visitaremos 4 taquerías emblemáticas.',
        price_per_person: 550,
        currency: 'MXN',
        duration_hours: 2.5,
        difficulty_level: 1,
        max_participants: 8,
        min_participants: 2,
        average_rating: 5.0,
        review_count: 200,
        created_at: new Date().toISOString(),
        category: MOCK_CATEGORIES[3], 
        location: MOCK_LOCATIONS.GDL,
        host: MOCK_HOST,
        images: [{ id: 'img-taco-1', image_url: '/images/pastor.png', is_primary: true, created_at: new Date().toISOString() }]
    },
    {
        id: 'exp-metropolitano',
        title: 'Parque Metropolitano Picnic',
        slug: 'parque-metropolitano',
        summary: 'Vive la naturaleza en grande: ¡Aventura familiar!',
        description: 'Disfruta de áreas deportivas, lago artificial y ciclovías. Ideal para rentar bicicletas.',
        price_per_person: 0,
        currency: 'MXN',
        duration_hours: 4,
        difficulty_level: 1,
        max_participants: 50,
        min_participants: 1,
        average_rating: 4.5,
        review_count: 300,
        created_at: new Date().toISOString(),
        category: MOCK_CATEGORIES[0], 
        location: MOCK_LOCATIONS.GDL,
        host: MOCK_HOST,
        images: [{ id: 'img-metro-1', image_url: '/images/metro.png', is_primary: true, created_at: new Date().toISOString() }]
    },
    {
        id: 'exp-xcaret',
        title: 'Entrada a Xcaret Plus',
        slug: 'xcaret-plus',
        summary: 'Un paraíso natural y cultural frente al mar Caribe.',
        description: 'Incluye ríos subterráneos, espectáculos nocturnos y comida buffet.',
        price_per_person: 3200,
        currency: 'MXN',
        duration_hours: 12,
        difficulty_level: 2,
        max_participants: 100,
        min_participants: 1,
        average_rating: 4.9,
        review_count: 5000,
        created_at: new Date().toISOString(),
        category: MOCK_CATEGORIES[2], 
        location: MOCK_LOCATIONS.CANCUN,
        host: MOCK_HOST,
        images: [{ id: 'img-xcaret-1', image_url: '/images/cancun.png', is_primary: true, created_at: new Date().toISOString() }]
    }
];

// --- 3. LANDING HIGHLIGHTS ---
export interface LandingHighlight { // FIX: La interfaz sigue exportada correctamente
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image_url: string;
    cta_label: string;
    cta_url: string;
    badge_label?: string;
    color_theme?: string;
    icon?: string;
}

export const MOCK_LANDING_HIGHLIGHTS: LandingHighlight[] = [
    {
        id: 'high-1',
        title: 'Crea tu paquete a medida',
        subtitle: 'Ahorra hasta un 20%',
        description: 'Elige hasta 4 parques o tours de nuestra selección premium y paga menos.',
        image_url: '/images/hotel2.png',
        cta_label: 'Armar Paquete',
        cta_url: '/paquetes',
        badge_label: '20% OFF',
        color_theme: 'bg-teal-700',
        icon: 'Anchor'
    },
    {
        id: 'high-2',
        title: 'Experiencias Semanales',
        subtitle: 'Descubre algo nuevo',
        description: 'Selecciona eventos culturales o de aventura renovados cada semana.',
        image_url: '/images/algo.png',
        cta_label: 'Ver Calendario',
        cta_url: '/eventos',
        badge_label: 'NUEVO',
        color_theme: 'bg-teal-800',
        icon: 'Trees'
    },
    {
        id: 'high-3',
        title: 'Ruta Arqueológica',
        subtitle: 'Historia Milenaria',
        description: 'Explora la historia de Jalisco con acceso prioritario a zonas exclusivas.',
        image_url: '/images/guachi.png',
        cta_label: 'Explorar',
        cta_url: '/tours/arqueologia',
        badge_label: '10% OFF',
        color_theme: 'bg-teal-700',
        icon: 'Globe'
    }
];
export interface ParkItem { // <--- FIX 1: Exportar esta interfaz
    id: string;
    title: string;
    description: string;
    slug: string;
    imageUrl: string; // <-- La necesita la tarjeta
    location: string; // <-- La necesita la tarjeta
    details: string[]; // <-- La necesita la tarjeta
}

// --- 4. CONFIGURACIÓN UI (Constantes faltantes: FIX) ---
// FIX 1: Exportar colores (Resuelve errores en layout.tsx, Footer.tsx, Header.tsx)
export const primaryColor = 'bg-teal-700';
export const secondaryColor = 'bg-gray-800';
export const tertiaryColor = 'bg-orange-500';

// FIX 2: Exportar Enlaces de Navegación (Resuelve error Export navLinks)
export const NAV_LINKS = [
    { label: "Inicio", href: "/" },
    { label: "Explorar", href: "/search" },
    { label: "Paquetes", href: "/paquetes" },
    { label: "Mis Viajes", href: "/dashboard/trips" },
];

// FIX 3: Exportar Paquetes de Explorador (Resuelve error Export explorerPackages en /paquetes/page.tsx)
export const explorerPackages = MOCK_LANDING_HIGHLIGHTS.map(h => ({
    ...h, 
    image_url: h.image_url,
})); 

// FIX 4: Exportar Ítems de Parques (Resuelve error Export parkItems en /app/parques/page.tsx)
export const parkItems = [
    { id: 'park-1', title: 'Parque Colomos', description: 'Pulmón verde de la ciudad', slug: 'parque-colomos' },
    { id: 'park-2', title: 'Barranca de Huentitán', description: 'Senderismo extremo', slug: 'barranca-huentitan' },
];

// FIX 5: Exportar Mapa de Iconos (Resuelve error Export IconMap en DiscountCard.tsx y otros)
export const IconMap = {
    MapPin: MapPin, Users: Users, Calendar: Calendar, Anchor: Anchor, Trees: Trees, Globe: Globe, Search: Search, Clock: Clock, DollarSign: DollarSign, ChevronLeft: ChevronLeft, ChevronRight: ChevronRight, Plane: Plane, Hotel: Hotel, Sun: Sun, User: UserIcon, Menu: Menu
};