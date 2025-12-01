// src/app/dashboard/trips/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Booking, UUID, User } from '@/types'; // Asegúrate de tener los tipos Booking y UUID
import { BookingService } from '@/services/booking.service';
import { ApiError } from '@/lib/api';
import { Hash, AlertTriangle, CheckCircle, Clock, Calendar, Users, DollarSign, ArrowLeft } from 'lucide-react';

// Mapeo simple de estado a color para la UI
const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
};

export default function BookingDetailPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params.id as string;
    
    // Estado de la reserva
    const [booking, setBooking] = useState<Booking | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Efecto para cargar la reserva al iniciar la página
    useEffect(() => {
        if (!bookingId) return;

        const fetchBooking = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Llama a tu servicio de reservas con el ID
                const data = await BookingService.getBookingById(bookingId as UUID); 
                setBooking(data);
            } catch (err) {
                const apiError = err as ApiError;
                if (apiError.status === 404) {
                    setError("Reserva no encontrada.");
                    return; 
                }
                setError(apiError.message || "Error al cargar la reserva.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooking();
    }, [bookingId]);

    // Helper para formatear la fecha
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-MX', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    // --- RENDERING CONDICIONAL ---
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-teal-600">Cargando detalles de la reserva...</p>
            </div>
        );
    }
    
    if (error === "Reserva no encontrada." || !booking) {
        // Redirige al 404 si el ID no existe o si no hay reserva
        return notFound();
    }
    
    // Datos de la UI
    const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
    const statusClass = statusColors[booking.status] || 'bg-gray-100 text-gray-700';
    // Nota: El título de la experiencia debe venir anidado en el objeto Booking del backend. 
    // Aquí solo mostramos el ID como placeholder.

    return (
        <main className="container mx-auto px-4 py-12 min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto">
                
                <button 
                    onClick={() => router.push('/dashboard/trips')} 
                    className="flex items-center text-teal-600 hover:text-teal-700 mb-6 font-medium transition-colors"
                >
                    <ArrowLeft size={20} className="mr-1" />
                    Volver a Mis Viajes
                </button>
                
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                    Detalles de tu Viaje
                </h1>
                <p className="text-gray-600 mb-8 flex items-center gap-2">
                    <Hash size={20} className="text-teal-600" /> 
                    Referencia: <span className="font-mono font-medium text-gray-800">{booking.booking_reference}</span>
                </p>

                {error && (
                    <div className="p-4 mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-center gap-3">
                        <AlertTriangle size={24} />
                        <p className="font-semibold">Error de Carga: {error}</p>
                    </div>
                )}
                
                {/* Panel de Estado y Precio */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 md:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Experiencia: 
                            <span className="text-teal-600"> ID: {booking.experience_id.substring(0, 8)}...</span>
                        </h2>

                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-3">
                                <Calendar size={20} className="text-teal-600" />
                                <p className="text-gray-700"><span className="font-semibold">Fecha de Reserva:</span> {formatDate(booking.booking_date)}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users size={20} className="text-teal-600" />
                                <p className="text-gray-700"><span className="font-semibold">Participantes:</span> {booking.number_of_participants}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-teal-600" />
                                <p className="text-gray-700"><span className="font-semibold">Horario/Schedule ID:</span> {booking.schedule_id.substring(0, 8)}...</p>
                            </div>
                        </div>

                        {booking.special_requests && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-sm font-semibold text-gray-600">Solicitudes Especiales:</p>
                                <p className="text-gray-700 italic">{booking.special_requests}</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Tarjeta de Resumen */}
                    <div className="bg-teal-700 text-white p-6 rounded-xl shadow-lg">
                        <p className="text-sm opacity-80 mb-1">Total Pagado</p>
                        <p className="text-4xl font-extrabold mb-4">
                            <DollarSign size={32} className="inline-block mr-1"/>
                            {booking.total_price.toFixed(2)} {booking.currency || 'MXN'}
                        </p>
                        
                        <p className={`text-sm font-bold px-3 py-1 rounded-full w-fit ${statusClass}`}>
                            Estado: {statusText}
                        </p>
                        
                        {booking.status === 'confirmed' && (
                            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-teal-200">
                                <CheckCircle size={18} />
                                <p>¡Tu reserva está confirmada!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección de Acciones */}
                <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end space-x-4">
                    {booking.status === 'pending' && (
                        <>
                            <button className="px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-semibold">
                                Cancelar Reserva (Simulado)
                            </button>
                            <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                                Ir a Pagar (Simulado)
                            </button>
                        </>
                    )}
                    <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                        Contactar al Anfitrión (Simulado)
                    </button>
                </div>

            </div>
        </main>
    );
}