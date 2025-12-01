// src/app/dashboard/trips/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// FIX 1: Importamos Calendar
import { Plane, Hash, CheckCircle, Clock, Calendar, Users, DollarSign, ArrowLeft, AlertTriangle, Loader, Package } from 'lucide-react'; 
import { BookingService } from '@/services/booking.service';
import { useAuth } from '@/hooks/useAuth';
import { Booking, PaginatedResponse } from '@/types'; 
import { ApiError } from '@/lib/api';

// Mapeo simple de estado a color
const statusColors: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-300',
    confirmed: 'bg-green-50 text-green-700 border-green-300',
    cancelled: 'bg-red-50 text-red-700 border-red-300',
    completed: 'bg-teal-50 text-teal-700 border-teal-300',
};

// Componente para mostrar una sola tarjeta de reserva
const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
    const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
    const statusClass = statusColors[booking.status] || 'bg-gray-50 text-gray-700 border-gray-300';
    const formattedDate = new Date(booking.booking_date).toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    
    // Nota: Asumimos que el título de la experiencia no viene directamente, 
    // pero si viniera anidado (booking.experience.title), lo usaríamos aquí.
    const experienceTitle = `Experiencia ID: ${booking.experience_id.substring(0, 8)}...`;


    return (
        <Link 
            href={`/dashboard/trips/${booking.id}`} 
            className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{experienceTitle}</h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusClass}`}>
                    {statusText}
                </span>
            </div>
            
            <div className="space-y-2 text-gray-600 text-sm">
                <p className="flex items-center gap-2">
                    <Hash size={16} className="text-teal-600" />
                    Referencia: <span className="font-mono">{booking.booking_reference}</span>
                </p>
                <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-teal-600" />
                    Fecha: {formattedDate}
                </p>
                <p className="flex items-center gap-2">
                    <DollarSign size={16} className="text-teal-600" />
                    Monto: {booking.total_price.toFixed(2)} {booking.currency}
                </p>
            </div>
            
            <p className="mt-4 text-teal-600 font-semibold flex items-center gap-1">
                Ver Detalles &rarr;
            </p>
        </Link>
    );
};


export default function MyTripsPage() {
    const { isAuthenticated: isLoggedIn, user } = useAuth();
    const router = useRouter();

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

    // Redirigir si no está logueado
    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push('/login');
        }
    }, [isLoading, isLoggedIn, router]);

    // Cargar reservas
    useEffect(() => {
        if (!isLoggedIn) return; // Esperamos a que la autenticación cargue
        
        const fetchBookings = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await BookingService.getGuestBookings(pagination.page, pagination.limit);
                
                // FIX 2: Usamos el operador de indexación [] para acceder a total_items 
                // ya que tu interfaz PaginatedResponse puede no tenerlo tipado como objeto clave
                const totalItems = (response as any).total_items || 0; 

                setBookings(response.data);
                setPagination(prev => ({ ...prev, total: totalItems }));

            } catch (err) {
                const apiError = err as ApiError;
                setError(apiError.message || 'Error al cargar tus viajes. Revisa la conexión al servidor.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, [isLoggedIn, pagination.page, pagination.limit]);


    // --- RENDERING ---

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12">
                <Loader className="w-12 h-12 text-teal-600 animate-spin mb-4" />
                <h1 className="text-xl text-gray-700">Cargando tus viajes...</h1>
            </div>
        );
    }
    
    // Si hay un error de carga grave
    if (error && bookings.length === 0) {
        return (
             <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-xl text-gray-700">Error al cargar:</h1>
                <p className="text-red-500 text-center max-w-lg mt-2">{error}</p>
                <Link href="/" className="mt-6 text-teal-600 font-medium hover:text-teal-700">
                    Ir a Inicio
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                    <Plane className="w-7 h-7 text-teal-600" /> Mis Viajes Reservados
                </h1>

                {/* Estado Vacío */}
                {bookings.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                            <Package className="w-12 h-12 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Aún no tienes viajes reservados</h2>
                        <p className="text-gray-500 mb-6">Explora y reserva tu próxima aventura en Jalisco.</p>
                        
                        <Link 
                            href="/search" 
                            className="inline-block bg-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors"
                        >
                            Explorar Destinos
                        </Link>
                    </div>
                ) : (
                    // Grid de Resultados
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                )}

                {/* Si implementas paginación, va aquí */}
                {/* {pagination.total > pagination.limit && <PaginationComponent />} */}
            </div>
        </main>
    );
}