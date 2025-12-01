import React from 'react';
import { Package } from 'lucide-react';
import { MOCK_LANDING_HIGHLIGHTS } from '@/lib/data';
import DiscountCard from '@/components/views/DiscountCard';

export default function PaquetesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-teal-100 rounded-full mb-4">
            <Package className="w-8 h-8 text-teal-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Paquetes Especiales</h1>
          <p className="text-gray-600 mt-2">Ahorra más combinando tus experiencias favoritas.</p>
        </div>

        {/* Grid de Paquetes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_LANDING_HIGHLIGHTS.map((highlight) => (
            <DiscountCard key={highlight.id} highlight={highlight} />
          ))}
        </div>
      </div>
    </div>
  );
}