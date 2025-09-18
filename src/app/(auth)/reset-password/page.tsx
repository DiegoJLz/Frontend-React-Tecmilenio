'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthService } from '../../../services';
import Logo from '../../../components/ui/Logo';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Get token from URL params
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Token de recuperación no válido o faltante');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      setError('La contraseña debe contener al menos una mayúscula, una minúscula y un número');
      setLoading(false);
      return;
    }

    try {
      console.log('🔄 Restableciendo contraseña con token:', token.substring(0, 20) + '...');

      await AuthService.resetPassword(token, newPassword, confirmPassword);

      setMessage('¡Contraseña restablecida exitosamente! Redirigiendo al login...');
      console.log('✅ Contraseña restablecida exitosamente');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login?password_reset=true');
      }, 2000);

    } catch (err: any) {
      console.error('❌ Error al restablecer contraseña:', err);
      setError(err.message || 'Error al restablecer la contraseña');
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
            Restablecer contraseña
          </h2>
          <p className="mt-2 text-sm text-white/90">
            Ingresa tu nueva contraseña
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

            {/* Password Requirements */}
            <div className="bg-gradient-to-r from-[#4DD0E1]/10 to-[#0097A7]/10 border border-[#4DD0E1]/20 rounded-xl p-4">
              <h3 className="font-semibold text-[#006064] mb-3 flex items-center">
                <span className="text-lg mr-2">🔒</span>
                Requisitos de contraseña:
              </h3>
              <ul className="text-sm text-[#0097A7] space-y-2 list-disc list-inside">
                <li>Mínimo 8 caracteres</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos una letra minúscula</li>
                <li>Al menos un número</li>
              </ul>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-[#006064] mb-2">
                Nueva Contraseña *
              </label>
              <input
                id="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1] focus:border-[#4DD0E1] transition-all duration-200 bg-white text-black"
                disabled={loading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#006064] mb-2">
                Confirmar Contraseña *
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu nueva contraseña"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1] focus:border-[#4DD0E1] transition-all duration-200 bg-white text-black"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !token}
              className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-[#006064] to-[#0097A7] hover:from-[#004D40] hover:to-[#006064] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4DD0E1] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Restableciendo...
                </div>
              ) : (
                'Restablecer contraseña'
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

        {/* Security Notice */}
        <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#FFEB3B]/10 border border-[#FFD700]/20 rounded-xl p-4">
          <h3 className="font-semibold text-[#006064] mb-3 flex items-center">
            <span className="text-lg mr-2">🛡️</span>
            Nota de seguridad:
          </h3>
          <div className="text-sm text-[#0097A7] space-y-2">
            <p>• Este enlace es válido por tiempo limitado</p>
            <p>• Una vez restablecida, la contraseña anterior ya no funcionará</p>
            <p>• Si no solicitaste este cambio, contacta a soporte inmediatamente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
