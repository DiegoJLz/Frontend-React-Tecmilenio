import React from 'react';
import Link from 'next/link';
import { Search, User, Menu, ShoppingBag } from 'lucide-react';

const Header: React.FC = () => {
  return (
    // Reemplazamos ${tertiaryColor} por 'bg-teal-600'
    <header className="bg-teal-600 text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* 1. LOGO / BRAND */}
          <Link href="/" className="text-xl font-bold tracking-wider hover:opacity-90 transition-opacity">
            TecMy<span className="text-teal-200">Explorer</span>
          </Link>

          {/* 2. SEARCH BAR (Visualmente funcional) */}
          <div className="hidden md:flex flex-1 mx-8 max-w-md relative">
            <input 
              type="text" 
              placeholder="Busca una experiencia..." 
              className="w-full py-1.5 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
              <Search size={16} />
            </button>
          </div>

          {/* 3. ACTIONS */}
          <div className="flex items-center gap-4">
            <button className="hover:text-teal-200 transition-colors">
              <Search className="md:hidden" size={24} />
            </button>
            
            <Link href="/cart" className="hover:text-teal-200 transition-colors relative">
              <ShoppingBag size={24} />
              {/* Badge de ejemplo */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </Link>
            
            <Link href="/login" className="hover:text-teal-200 transition-colors">
              <User size={24} />
            </Link>

            <button className="md:hidden hover:text-teal-200 transition-colors">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;