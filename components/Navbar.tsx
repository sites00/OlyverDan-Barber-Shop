import React, { useState } from 'react';
import { Scissors, Menu, X, Settings } from 'lucide-react';
import { ShopInfo } from '../data/barberData';

interface NavbarProps {
  shopInfo: ShopInfo;
  onOpenBooking: () => void;
  onOpenBarberPanel: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  shopInfo,
  onOpenBooking,
  onOpenBarberPanel,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Cortes', href: '#galeria' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Horários', href: '#horarios' },
    { label: 'Localização', href: '#localizacao' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0D11]/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#99731C] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#0B0D11] rounded-[7px] flex items-center justify-center group-hover:bg-[#14171E] transition-colors">
              <Scissors className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap">
              OlyverDan <span className="text-[#D4AF37] font-normal">Barber Shop</span>
            </span>
            <span className="text-[11px] text-neutral-400 font-medium tracking-wider uppercase">
              Pirapora · MG
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Barber Panel Quick Access */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Barber Panel shortcut button */}
          <button
            onClick={onOpenBarberPanel}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            title="Painel do Barbeiro (Gerenciar Cortes e Preços)"
            aria-label="Painel do Barbeiro"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-black bg-gradient-to-r from-[#E5B842] to-[#D4AF37] hover:from-[#ECC258] hover:to-[#DEB748] rounded-lg shadow-sm hover:shadow-[#D4AF37]/20 transition-all whitespace-nowrap tracking-wide uppercase"
          >
            Agendar Horário
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F1217] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-neutral-200 hover:text-[#D4AF37] hover:bg-neutral-800/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-black bg-gradient-to-r from-[#E5B842] to-[#D4AF37] rounded-lg shadow-sm"
            >
              Agendar pelo WhatsApp
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBarberPanel();
              }}
              className="w-full py-2.5 text-center text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800/60 rounded-lg flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4 text-[#D4AF37]" />
              Painel do Barbeiro (Gerenciar Fotos & Cortes)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
