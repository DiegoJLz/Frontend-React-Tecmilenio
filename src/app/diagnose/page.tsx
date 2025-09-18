'use client';

import { useState } from 'react';
import { checkBackendHealth, findBackendEndpoint } from '../../lib/health-check';

export default function DiagnosePage() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    setResults(null);

    try {
      console.log('🔍 Running backend diagnostics...');

      // Check backend health
      const healthCheck = await checkBackendHealth();

      // Find working endpoints
      const endpointCheck = await findBackendEndpoint();

      const diagnostics = {
        timestamp: new Date().toISOString(),
        healthCheck,
        endpointCheck,
        frontendInfo: {
          origin: window.location.origin,
          userAgent: navigator.userAgent,
        },
        backendUrl: 'http://localhost:8080',
      };

      setResults(diagnostics);
      console.log('📊 Diagnostics complete:', diagnostics);
    } catch (error) {
      console.error('❌ Diagnostics failed:', error);
      setResults({
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const testRegisterEndpoint = async () => {
    setLoading(true);

    try {
      const testData = {
        first_name: 'Test',
        last_name: 'User',
        phone: '+1234567890',
        email: `test${Date.now()}@example.com`,
        password: 'MySecure123!',
        confirm_password: 'MySecure123!',
      };

      console.log('🧪 Testing register endpoint...');

      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(testData),
      });

      const result = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: await response.text(),
      };

      setResults(prev => ({
        ...prev,
        registerTest: result,
      }));

      console.log('📡 Register endpoint test result:', result);
    } catch (error) {
      console.error('❌ Register endpoint test failed:', error);
      setResults(prev => ({
        ...prev,
        registerTest: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🔧 Backend Diagnostics
        </h1>

        <div className="space-y-4 mb-8">
          <button
            onClick={runDiagnostics}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🔄 Running diagnostics...' : '🔍 Run Backend Diagnostics'}
          </button>

          <button
            onClick={testRegisterEndpoint}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🔄 Testing...' : '🧪 Test Register Endpoint'}
          </button>
        </div>

        {results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📊 Diagnostic Results
            </h2>

            <div className="space-y-4">
              {/* Health Check Results */}
              {results.healthCheck && (
                <div className={`p-4 rounded-md ${
                  results.healthCheck.isOnline
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h3 className="font-medium mb-2">
                    {results.healthCheck.isOnline ? '✅ Backend Health' : '❌ Backend Health'}
                  </h3>
                  <p className="text-sm">
                    {results.healthCheck.isOnline
                      ? 'Backend is online and responding'
                      : results.healthCheck.error
                    }
                  </p>
                  {results.healthCheck.response && (
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(results.healthCheck.response, null, 2)}
                    </pre>
                  )}
                </div>
              )}

              {/* Endpoint Check Results */}
              {results.endpointCheck && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="font-medium mb-2">🔍 Endpoint Discovery</h3>
                  {results.endpointCheck.workingEndpoint ? (
                    <p className="text-sm text-green-700">
                      ✅ Working endpoint found: {results.endpointCheck.workingEndpoint}
                    </p>
                  ) : (
                    <div>
                      <p className="text-sm text-red-700 mb-2">❌ No working endpoints found</p>
                      <div className="text-xs">
                        {Object.entries(results.endpointCheck.errors).map(([endpoint, error]) => (
                          <div key={endpoint} className="mb-1">
                            <strong>{endpoint}:</strong> {error}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Register Test Results */}
              {results.registerTest && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                  <h3 className="font-medium mb-2">🧪 Register Endpoint Test</h3>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(results.registerTest, null, 2)}
                  </pre>
                </div>
              )}

              {/* Frontend Info */}
              {results.frontendInfo && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <h3 className="font-medium mb-2">💻 Frontend Information</h3>
                  <div className="text-sm space-y-1">
                    <div><strong>Origin:</strong> {results.frontendInfo.origin}</div>
                    <div><strong>User Agent:</strong> {results.frontendInfo.userAgent}</div>
                    <div><strong>Backend URL:</strong> {results.backendUrl}</div>
                  </div>
                </div>
              )}

              {/* Full Results */}
              <details className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <summary className="font-medium cursor-pointer">📋 Full Diagnostic Data</summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto max-h-96">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="font-medium text-yellow-800 mb-2">📋 Troubleshooting Steps</h3>
          <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
            <li>Make sure your Rust backend is running on port 8080</li>
            <li>Check if the backend has CORS enabled for localhost:3000</li>
            <li>Verify the endpoint path: /api/v1/auth/register</li>
            <li>Check the backend logs for any errors</li>
            <li>Try accessing http://localhost:8080 directly in your browser</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
