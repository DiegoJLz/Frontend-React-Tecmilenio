'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthService } from '../../../services';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    // Get email from URL params or localStorage
    const emailParam = searchParams.get('email');
    const storedEmail = localStorage.getItem('pending_verification_email');
    const token = searchParams.get('token');

    if (emailParam) {
      setEmail(emailParam);
      localStorage.setItem('pending_verification_email', emailParam);
    } else if (storedEmail) {
      setEmail(storedEmail);
    }

    // If token is present in URL, automatically verify email
    if (token) {
      handleVerifyEmail(token);
    }
  }, [searchParams]);

  const handleVerifyEmail = async (token: string) => {
    setVerifying(true);
    setError('');
    setMessage('');

    try {
      console.log('🔍 Verificando email con token...');

      await AuthService.verifyEmail(token);

      setMessage('¡Email verificado exitosamente! Redirigiendo al login...');
      console.log('✅ Email verificado exitosamente');

      // Clear stored email and redirect to login with success message after 2 seconds
      localStorage.removeItem('pending_verification_email');
      setTimeout(() => {
        router.push('/login?verified=true');
      }, 2000);

    } catch (err: any) {
      console.error('❌ Error al verificar email:', err);
      setError(err.message || 'Error al verificar el email');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError('No se encontró el email para reenviar');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      console.log('🔄 Reenviando email de verificación a:', email);

      await AuthService.resendVerificationEmail(email);

      setMessage('Email de verificación reenviado exitosamente');
      console.log('✅ Email de verificación reenviado');
    } catch (err: any) {
      console.error('❌ Error al reenviar email:', err);
      setError(err.message || 'Error al reenviar el email de verificación');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    localStorage.removeItem('pending_verification_email');
    router.push('/login');
  };

  const handleChangeEmail = () => {
    localStorage.removeItem('pending_verification_email');
    router.push('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verifica tu email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Te hemos enviado un enlace de verificación
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <div className="space-y-6">
            {/* Email Display */}
            {email && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Hemos enviado un email de verificación a:
                </p>
                <p className="font-medium text-gray-900 bg-gray-50 px-4 py-2 rounded-md">
                  {email}
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="font-medium text-blue-800 mb-2">📧 Instrucciones:</h3>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Revisa tu bandeja de entrada</li>
                <li>Busca un email de "Local Experiences"</li>
                <li>Haz clic en el enlace de verificación</li>
                <li>Si no lo encuentras, revisa la carpeta de spam</li>
              </ol>
            </div>

            {/* Success Message */}
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {message}
                </div>
              </div>
            )}

            {/* Verifying Message */}
            {verifying && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md">
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando email...
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleResendEmail}
                disabled={loading || verifying || !email}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Reenviando...
                  </div>
                ) : (
                  '🔄 Reenviar email de verificación'
                )}
              </button>


              <button
                onClick={handleChangeEmail}
                disabled={verifying}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✏️ Cambiar email
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="font-medium text-yellow-800 mb-2">❓ ¿Necesitas ayuda?</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>• El email puede tardar unos minutos en llegar</p>
            <p>• Revisa tu carpeta de spam o correo no deseado</p>
            <p>• Si el problema persiste, contacta a soporte</p>
          </div>
        </div>
      </div>
    </div>
  );
}
