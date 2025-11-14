// src/components/layout/NavBar.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, primaryColor } from '@/lib/data';

const NavBar: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className={`${primaryColor} text-white shadow-xl sticky top-0 z-10`}> 
            <div className="container mx-auto px-4">
                <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.label}
                            href={link.href}
                            className={`px-4 py-2 text-sm font-medium transition duration-150 rounded-lg mx-1 
                                ${pathname.startsWith(link.href) ? 'bg-teal-600 font-bold border-b-2 border-amber-400' : 'hover:bg-teal-600'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;