import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    // Reemplazamos ${primaryColor} por 'bg-teal-900' directamente
    <footer className="bg-teal-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* 1. BRAND & INFO */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white p-1.5 rounded-lg">
                <Globe className="h-6 w-6 text-teal-900" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                TecMyExplorer
              </span>
            </div>
            <p className="text-teal-100 text-sm leading-relaxed mb-6">
              Descubre los mejores destinos de Jalisco y México con nosotros. 
              Experiencias únicas, naturaleza y cultura en un solo lugar.
            </p>
          </div>

          {/* 2. ENLACES RÁPIDOS */}
          <div>
            <h3 className="text-lg font-bold mb-4">Explorar</h3>
            <ul className="space-y-3 text-teal-100 text-sm">
              <li>
                <Link href="/search" className="hover:text-white transition-colors">Destinos</Link>
              </li>
              <li>
                <Link href="/search?category=adventure" className="hover:text-white transition-colors">Aventura</Link>
              </li>
              <li>
                <Link href="/search?category=culture" className="hover:text-white transition-colors">Cultura</Link>
              </li>
              <li>
                <Link href="/paquetes" className="hover:text-white transition-colors">Paquetes</Link>
              </li>
            </ul>
          </div>

          {/* 3. LEGAL */}
          <div>
            <h3 className="text-lg font-bold mb-4">Soporte</h3>
            <ul className="space-y-3 text-teal-100 text-sm">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">Centro de Ayuda</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contáctanos</Link>
              </li>
            </ul>
          </div>

          {/* 4. CONTACTO */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-4 text-teal-100 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-400 shrink-0" />
                <span>Av. Vallarta 1234, Guadalajara, Jalisco, México.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-400 shrink-0" />
                <span>+52 (33) 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-400 shrink-0" />
                <span>contacto@tecmye.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-teal-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-teal-200 text-sm text-center md:text-left">
            © {new Date().getFullYear()} TecMyExplorer. Todos los derechos reservados.
          </p>
          
          {/* SOCIAL ICONS */}
          <div className="flex gap-4">
            <a href="#" className="bg-teal-800 p-2 rounded-full hover:bg-teal-700 transition-colors text-white">
              <Facebook size={18} />
            </a>
            <a href="#" className="bg-teal-800 p-2 rounded-full hover:bg-teal-700 transition-colors text-white">
              <Twitter size={18} />
            </a>
            <a href="#" className="bg-teal-800 p-2 rounded-full hover:bg-teal-700 transition-colors text-white">
              <Instagram size={18} />
            </a>
            <a href="#" className="bg-teal-800 p-2 rounded-full hover:bg-teal-700 transition-colors text-white">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;