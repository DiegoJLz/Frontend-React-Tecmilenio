'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../../../services';
import Logo from '../../../components/ui/Logo';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      console.log('🔄 Enviando solicitud de recuperación de contraseña para:', email);

      await AuthService.forgotPassword(email);

      setMessage('¡Email de recuperación enviado! Revisa tu bandeja de entrada.');
      console.log('✅ Email de recuperación enviado exitosamente');

      // Clear form after successful submission
      setEmail('');

    } catch (err: any) {
      console.error('❌ Error al enviar email de recuperación:', err);
      setError(err.message || 'Error al enviar el email de recuperación');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD700] via-[#4DD0E1] to-[#006064] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
            Recuperar contraseña
          </h2>
          <p className="mt-2 text-sm text-white/90">
            Te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur-sm py-8 px-6 shadow-2xl rounded-2xl border border-white/20 relative overflow-hidden">
          {/* Decorative elements inside form */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFD700]/10 to-[#4DD0E1]/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#4DD0E1]/10 to-[#006064]/10 rounded-full translate-y-12 -translate-x-12"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-r-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="bg-green-50 border-l-4 border-green-400 text-green-700 px-4 py-3 rounded-r-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {message}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gradient-to-r from-[#4DD0E1]/10 to-[#0097A7]/10 border border-[#4DD0E1]/20 rounded-xl p-4">
              <h3 className="font-semibold text-[#006064] mb-3 flex items-center">
                <span className="text-lg mr-2">🔑</span>
                Instrucciones:
              </h3>
              <ol className="text-sm text-[#0097A7] space-y-2 list-decimal list-inside">
                <li>Ingresa tu email registrado</li>
                <li>Te enviaremos un enlace de recuperación</li>
                <li>Revisa tu bandeja de entrada</li>
                <li>Haz clic en el enlace para restablecer tu contraseña</li>
              </ol>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#006064] mb-2">
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1] focus:border-[#4DD0E1] transition-all duration-200 bg-white text-black"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-[#006064] to-[#0097A7] hover:from-[#004D40] hover:to-[#006064] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4DD0E1] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </div>
              ) : (
                'Enviar enlace de recuperación'
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleGoBack}
                className="text-sm text-[#006064] hover:text-[#0097A7] transition-colors duration-200"
              >
                ← Volver al inicio de sesión
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#FFEB3B]/10 border border-[#FFD700]/20 rounded-xl p-4">
          <h3 className="font-semibold text-[#006064] mb-3 flex items-center">
            <span className="text-lg mr-2">❓</span>
            ¿Necesitas ayuda?
          </h3>
          <div className="text-sm text-[#0097A7] space-y-2">
            <p>• El email puede tardar unos minutos en llegar</p>
            <p>• Revisa tu carpeta de spam o correo no deseado</p>
            <p>• Si no recibes el email, verifica que el email sea correcto</p>
            <p>• Si el problema persiste, contacta a soporte</p>
          </div>
        </div>
      </div>
    </div>
  );
}
