// src/components/layout/NavBar.tsx
'use client'; 

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, User as UserIcon, LogOut } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data'; 
import { useAuth } from '@/hooks/useAuth'; 

const NavBar: React.FC = () => {
    const pathname = usePathname();
    
    // FIX: Usamos isAuthenticated y lo renombramos a isLoggedIn
    const { user, isAuthenticated: isLoggedIn, logout } = useAuth(); 

    return (
        <header className="sticky top-0 z-40 bg-white shadow-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                
                {/* Logo */}
                <Link href="/" className="flex items-center text-xl font-bold text-teal-700">
                    <MapPin size={24} className="mr-1" />
                    TecMyExplorer
                </Link>

                {/* Enlaces principales */}
                <nav className="hidden md:flex space-x-6">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${
                                pathname === link.href
                                    ? 'text-teal-600 border-b-2 border-teal-600 pb-1'
                                    : 'text-gray-600 hover:text-teal-600'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Botones de Autenticación / Perfil */}
                <div className="flex items-center space-x-3">
                    {isLoggedIn && user ? (
                        // --- VISTA LOGUEADO ---
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                <UserIcon size={18} className="text-teal-600" />
                                {user.first_name || user.username}
                            </span>
                            <button
                                onClick={logout} 
                                className="px-3 py-1.5 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center gap-1 text-sm"
                            >
                                <LogOut size={16} />
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        // --- VISTA NO LOGUEADO ---
                        <>
                            <Link
                                href="/login"
                                className="px-3 py-1.5 border rounded-md text-teal-600 border-teal-600 hover:bg-teal-50 transition-colors text-sm"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register" 
                                className="px-3 py-1.5 rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors text-sm"
                            >
                                Regístrate
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavBar;