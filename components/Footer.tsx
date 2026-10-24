import React from 'react';
import { Scissors, Lock, Heart, ArrowUp } from 'lucide-react';
import { ShopInfo } from '../data/barberData';

interface FooterProps {
  shopInfo: ShopInfo;
  onOpenBarberPanel: () => void;
}

export const Footer: React.FC<FooterProps> = ({ shopInfo, onOpenBarberPanel }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090C] border-t border-neutral-800 text-neutral-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center text-black">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-white text-base">
                OlyverDan <span className="text-[#D4AF37] font-normal">Barber</span>
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Barbearia masculina de alto nível no bairro Santos Dumont, Pirapora – MG. Cuidado especial em cada detalhe.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#servicos" className="hover:text-[#D4AF37] transition-colors">
                  Serviços & Preços
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-[#D4AF37] transition-colors">
                  Galeria de Cortes
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#D4AF37] transition-colors">
                  Sobre a Barbearia
                </a>
              </li>
              <li>
                <a href="#horarios" className="hover:text-[#D4AF37] transition-colors">
                  Horários
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-[#D4AF37] transition-colors">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Address & Hours */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Endereço & Atendimento
            </h4>
            <p className="text-neutral-300">
              {shopInfo.address}
            </p>
            <p className="text-neutral-400">
              {shopInfo.neighborhood}, {shopInfo.city} - {shopInfo.state}
            </p>
            <p className="text-[#D4AF37] pt-1">
              Seg - Sáb: {shopInfo.openingHours.weekdays}
            </p>
            <p className="text-neutral-500">
              Domingo: {shopInfo.openingHours.sunday}
            </p>
          </div>

          {/* Contact & Barber Administration */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Administração
            </h4>
            <p className="text-neutral-400">
              Área exclusiva para o proprietário gerenciar fotos de cortes, preços e horários.
            </p>
            <button
              onClick={onOpenBarberPanel}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors text-xs"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Painel do Barbeiro</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} OlyverDan Barber Shop. Todos os direitos reservados. Pirapora – MG.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[#D4AF37] transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
