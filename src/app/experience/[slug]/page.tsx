// src/app/experience/[slug]/page.tsx
'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { MapPin, Clock, Users, Star, Calendar, CheckCircle, User as UserIcon, Send } from 'lucide-react';

// Importa tus datos y tipos
import { MOCK_EXPERIENCES, MOCK_REVIEWS } from '@/lib/data';
import { Review, UUID } from '@/types'; 

// Importa los servicios y hooks funcionales
import { useAuth } from '@/hooks/useAuth'; 
import { BookingService } from '@/services/booking.service';
import { ReviewService } from '@/services/review.service'; // ¡Servicio de Reseñas!
import { ApiError } from '@/lib/api'; // Para manejar errores de API

interface PageProps {
  params: {
    slug: string;
  };
}

// --- Componente para una sola reseña (ReviewItem) ---
const ReviewItem: React.FC<{ review: Review }> = ({ review }) => {
  const formattedDate = new Date(review.created_at).toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const ratingStars = Array(5).fill(0).map((_, i) => (
    <Star key={i} size={16} className={`text-yellow-500 ${i < review.rating ? 'fill-yellow-500' : 'fill-transparent'}`} />
  ));

  return (
    <div className="border-b pb-4 mb-4 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-teal-700">
          {review.author?.first_name?.[0]}{review.author?.last_name?.[0]}
        </div>
        <div>
          <p className="font-bold text-gray-900">{review.author?.first_name} {review.author?.last_name}</p>
          <div className="flex gap-0.5 mt-0.5">{ratingStars}</div>
        </div>
      </div>
      <h4 className="text-md font-bold text-gray-800 mb-1">{review.title}</h4>
      <p className="text-gray-600 text-sm">{review.comment}</p>
      <p className="text-xs text-gray-400 mt-2">{formattedDate}</p>
    </div>
  );
};


// --- Componente principal de la página ---
export default function ExperienceDetailPage({ params }: PageProps) {
  
  const slug = (params as { slug: string }).slug; 
  const experience = MOCK_EXPERIENCES.find((e) => e.slug === slug);
  const reviewsForExperience = MOCK_REVIEWS.filter(r => r.experience_id === experience?.id);

  // --- HOOKS DE AUTENTICACIÓN Y RUTA ---
  const { isAuthenticated: isLoggedIn, user } = useAuth();
  const router = useRouter();

  // --- ESTADOS PARA LA RESERVA ---
  const [date, setDate] = useState<string>('');
  const [participants, setParticipants] = useState<number>(1);
  const [isReserving, setIsReserving] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // --- ESTADOS PARA LA RESEÑA ---
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false); // <-- NUEVO ESTADO
  const [reviewError, setReviewError] = useState<string | null>(null);


  if (!experience) {
    return notFound();
  }

  // --- CONSTANTES MOCK (Reemplazar con datos reales en producción) ---
  const MOCK_SCHEDULE_ID = "f71d5306-692a-45c1-8409-5a109861614e"; 
  // Para que una reseña sea válida, el backend requiere un ID de booking completado
  const MOCK_BOOKING_ID = "1a2b3c4d-5e6f-7080-9a1b-2c3d4e5f6a7b"; 


  // =================================================================
  // LÓGICA DE RESERVA (Botón "Reservar Ahora")
  // =================================================================
  const handleReservation = async () => {
    setBookingError(null);

    if (!isLoggedIn || !user || !user.id) {
        setBookingError("Debes iniciar sesión para completar la reserva.");
        router.push('/login');
        return;
    }
    
    if (!date || participants < 1) {
      setBookingError("Por favor, selecciona una fecha y un número de participantes válido.");
      return;
    }

    setIsReserving(true);

    try {
        const bookingData = {
            scheduleId: MOCK_SCHEDULE_ID, 
            userId: user.id,              
            numberOfParticipants: participants,
            // specialRequests: 'opcional'
        };

        const newBooking = await BookingService.createBooking(
            experience.id, 
            bookingData
        );

        alert(`¡Reserva creada con éxito! Referencia: ${newBooking.booking_reference}. Redirigiendo a tu reserva.`);
        router.push(`/dashboard/trips/${newBooking.id}`); 

    } catch (error) {
        const apiError = error as ApiError;
        setBookingError(apiError.message || 'Fallo la creación de la reserva. Intenta de nuevo. Revisa la consola para más detalles.');
    } finally {
        setIsReserving(false);
    }
  };


  // =================================================================
  // LÓGICA DE RESEÑA (Botón "Enviar Comentario")
  // =================================================================
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError(null);

    if (!isLoggedIn || !user || !user.id) {
        setReviewError("Debes iniciar sesión para dejar una reseña.");
        router.push('/login');
        return;
    }

    if (newRating === 0 || newComment.trim() === '') {
        setReviewError('Por favor, ingresa un comentario y una calificación.');
        return;
    }
    
    setIsSubmittingReview(true);
    
    try {
        const reviewPayload = {
            bookingId: MOCK_BOOKING_ID, // ID de una reserva completada (simulado)
            userId: user.id,
            rating: newRating,
            title: `Reseña de ${user.first_name || user.username || 'Usuario'}`,
            comment: newComment,
        };

        const createdReview = await ReviewService.createReview(
            experience.id as UUID, 
            reviewPayload
        );
        
        alert(`¡Reseña enviada con éxito! ID: ${createdReview.id}`);
        setNewComment('');
        setNewRating(0);
        // Sugerencia: Actualizar aquí la lista de reseñas localmente o recargar la página

    } catch (error) {
        const apiError = error as ApiError;
        setReviewError(apiError.message || 'Fallo el envío de la reseña. Revisa la consola para más detalles.');
    } finally {
        setIsSubmittingReview(false);
    }
  };


  const mainImage = experience.images?.find(img => img.is_primary)?.image_url 
    || experience.images?.[0]?.image_url 
    || '/images/placeholder.jpg';

  return (
    <main className="min-h-screen bg-white pb-20">
      
      {/* HERO SECTION (Imagen Gigante) */}
      {/* ... (Todo el código del HERO SECTION permanece igual) ... */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={mainImage}
          alt={experience.title}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white container mx-auto">
          {experience.category && (
            <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
              {experience.category.name}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-md">
            {experience.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base opacity-90">
            {experience.location && (
              <span className="flex items-center gap-1">
                <MapPin size={18} /> {experience.location.city}, {experience.location.state}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star size={18} className="text-yellow-400 fill-yellow-400" /> 
              {experience.average_rating} ({experience.review_count} reseñas)
            </span>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* COLUMNA IZQUIERDA: Info del Tour + Reseñas */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* ... (Iconos de Resumen, Descripción Larga, Anfitrión, permanecen iguales) ... */}
          <div className="flex flex-wrap gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <Clock className="text-teal-600" size={24} />
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Duración</p>
                <p className="font-medium">{experience.duration_hours} Horas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-teal-600" size={24} />
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Grupo</p>
                <p className="font-medium">Max {experience.max_participants} personas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-teal-600" size={24} />
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Dificultad</p>
                <p className="font-medium">Nivel {experience.difficulty_level}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acerca de esta experiencia</h2>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
              {experience.description}
            </p>
          </div>

          {experience.host && (
            <div className="flex items-center gap-4 p-6 border rounded-xl bg-white shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl overflow-hidden shrink-0">
                 <UserIcon size={32} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Organizado por</p>
                <p className="font-bold text-lg">{experience.host.first_name} {experience.host.last_name}</p>
                {experience.host.is_verified && (
                  <span className="text-xs text-green-600 flex items-center gap-1 font-medium mt-1">
                    <CheckCircle size={12} /> Identidad Verificada
                  </span>
                )}
              </div>
            </div>
          )}

          {/* --- SECCIÓN DE COMENTARIOS/RESEÑAS (Funcional) --- */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Reseñas de viajeros ({reviewsForExperience.length})
            </h2>
            
            {/* Lista de Reseñas */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4 mb-8">
              {reviewsForExperience.length > 0 ? (
                reviewsForExperience.map(review => (
                  <ReviewItem key={review.id} review={review} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Sé el primero en dejar una reseña.</p>
              )}
            </div>
            
            {/* Formulario para añadir Reseña (Funcional) */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">Deja tu comentario</h3>
            
            {reviewError && (
                <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {reviewError}
                </div>
            )}
            
            <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-2">Tu calificación</label>
              <div className="flex gap-1 mb-4">
    {Array(5).fill(0).map((_, i) => (
        <Star 
            key={i} 
            size={24} 
            className={`cursor-pointer transition-colors ${i < newRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} ${isSubmittingReview ? 'pointer-events-none opacity-50' : ''}`} 
            onClick={() => {
                // FIX: Solo ejecuta el cambio de rating si NO se está enviando.
                if (!isSubmittingReview) { 
                    setNewRating(i + 1);
                }
            }} 
        />
    ))}
</div>
              
              <label htmlFor="comment" className="block text-sm font-bold text-gray-700 mb-2">Tu opinión</label>
              <textarea
                id="comment"
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none text-gray-900" 
                placeholder="Comparte tu experiencia..."
                disabled={isSubmittingReview}
              />
              
              <button 
                type="submit" 
                className="mt-4 bg-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2"
                disabled={isSubmittingReview}
              >
                <Send size={18} /> {isSubmittingReview ? 'Enviando...' : 'Enviar Comentario'}
              </button>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA: Tarjeta de Precio y Reserva (Funcional) */}
        <div className="relative">
          <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm text-gray-400">Precio total</p>
                <p className="text-3xl font-bold text-teal-700">
                  ${experience.price_per_person} <span className="text-sm text-gray-500 font-normal">{experience.currency}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded text-xs font-bold">
                  Por persona
                </span>
              </div>
            </div>

            {/* Mensajes de Error de Reserva */}
            {bookingError && (
                <div className="p-2 mb-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
                    {bookingError}
                </div>
            )}
            
            {/* Campo Fecha del viaje */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Fecha del viaje</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-gray-600" 
                disabled={isReserving}
              />
            </div>

            {/* Campo Participantes */}
             <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Participantes</label>
              <input 
                type="number" 
                min="1"
                max={experience.max_participants}
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-gray-900" 
                disabled={isReserving}
              />
            </div>

            {/* Botón Reservar Ahora */}
            <div>
                <button
                    onClick={handleReservation}
                    className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-200/50 transform active:scale-95"
                    disabled={isReserving}
                >
                    {isReserving ? 'Procesando Reserva...' : 'Reservar Ahora'}
                </button>
            </div>
            
            <p className="text-center text-xs text-gray-400 mt-4 flex justify-center items-center gap-1">
              <CheckCircle size={12} /> Reserva segura y garantizada
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}