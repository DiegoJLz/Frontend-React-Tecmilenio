// src/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { primaryColor } from '@/lib/data'; 

const Footer: React.FC = () => (
    <footer className={`${primaryColor} text-white py-12`}>
        <div className="container mx-auto px-4">
            <div className="text-center mb-10 pb-4 border-b border-teal-600">
                <p className="text-lg font-semibold mb-2">Servicio al cliente / Ventas</p>
                <div className="bg-white text-teal-800 p-3 rounded-lg inline-block shadow-md">
                    <p className="font-bold">Lunes a Viernes de 7:00 a.m. a 12:00 a.m. / Sábado y Domingo de 7:00 a.m. a 10:00 p.m. Hora Local.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-10">
                <div>
                    <p className="font-bold text-lg mb-2 text-amber-400">México:</p>
                    <p className="text-xl font-extrabold">998-883-3143</p>
                    <Link href="https://wa.me/9988833143" className="block text-sm hover:underline">Whatsapp</Link>
                </div>
                <div className="border-y sm:border-x border-teal-600 sm:border-y-0 py-4 sm:py-0">
                    <p className="font-bold text-lg mb-2 text-amber-400">Centro de atención</p>
                    <Link href="#" className="block hover:underline">Chat en web</Link>
                    <Link href="#" className="block hover:underline">Messenger</Link>
                </div>
                <div>
                    <p className="font-bold text-lg mb-2 text-amber-400">Otros países y regiones</p>
                    <p className="text-xl font-extrabold">Consulta aquí</p>
                </div>
            </div>
            <div className="flex justify-center items-center space-x-6 pt-4 border-t border-teal-600">
                <p className="font-bold text-lg text-amber-400">Redes sociales:</p>
                <Link href="https://www.facebook.com/" aria-label="Facebook" className="hover:text-amber-400 transition"><Facebook size={24} /></Link>
                <Link href="https://x.com/?lang=es" aria-label="Twitter/X" className="hover:text-amber-400 transition"><Twitter size={24} /></Link>
                <Link href="https://www.instagram.com/" aria-label="Instagram" className="hover:text-amber-400 transition"><Instagram size={24} /></Link>
                <Link href="https://www.youtube.com/" aria-label="YouTube" className="hover:text-amber-400 transition"><Youtube size={24} /></Link>
            </div>
        </div>
    </footer>
);

export default Footer;