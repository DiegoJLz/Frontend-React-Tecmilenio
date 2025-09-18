'use client';

import { useState } from 'react';

export default function BackendSetupPage() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('offline');

  const checkBackend = async () => {
    setBackendStatus('checking');

    try {
      const response = await fetch('http://localhost:8080/api/v1/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (response.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch (error) {
      setBackendStatus('offline');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🔧 Configuración del Backend
        </h1>

        {/* Backend Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Estado del Backend</h2>
            <button
              onClick={checkBackend}
              disabled={backendStatus === 'checking'}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {backendStatus === 'checking' ? 'Verificando...' : 'Verificar Estado'}
            </button>
          </div>

          <div className={`p-4 rounded-md ${
            backendStatus === 'online'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : backendStatus === 'checking'
              ? 'bg-yellow-50 border border-yellow-200 text-yellow-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {backendStatus === 'online' && (
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ✅ Backend está corriendo correctamente
              </div>
            )}
            {backendStatus === 'checking' && (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                🔄 Verificando conexión...
              </div>
            )}
            {backendStatus === 'offline' && (
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ❌ Backend no está corriendo
              </div>
            )}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Instrucciones para Configurar el Backend</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-lg mb-2">1. Inicia tu servidor de Rust</h3>
              <p className="text-gray-600 mb-2">Asegúrate de que tu backend esté corriendo en el puerto 8080:</p>
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                cargo run
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-lg mb-2">2. Configura CORS en tu backend</h3>
              <p className="text-gray-600 mb-2">Agrega esta configuración a tu servidor de Rust:</p>
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`// Para Axum
use tower_http::cors::{CorsLayer, Any};

let cors = CorsLayer::new()
    .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
    .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
    .allow_headers(Any);

let app = Router::new()
    .route("/api/v1/auth/register", post(register_handler))
    .layer(cors);`}</pre>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium text-lg mb-2">3. Crea el endpoint de registro</h3>
              <p className="text-gray-600 mb-2">Asegúrate de tener este endpoint en tu backend:</p>
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                POST /api/v1/auth/register
              </div>
              <p className="text-gray-600 mt-2">Que reciba este JSON:</p>
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                <pre>{`{
  "first_name": "string",
  "last_name": "string",
  "phone": "string",
  "email": "string",
  "password": "string",
  "confirm_password": "string"
}`}</pre>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-medium text-lg mb-2">4. Verifica la conexión</h3>
              <p className="text-gray-600 mb-2">Una vez configurado, haz clic en "Verificar Estado" arriba.</p>
              <p className="text-gray-600">Si todo está bien, podrás usar el formulario de registro.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-lg mb-4">🔗 Enlaces Rápidos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
              >
                📝 Ir al Formulario de Registro
              </a>
              <a
                href="/diagnose"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-center"
              >
                🔧 Diagnóstico Completo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
