import React from 'react';
import { Calendar, Eye, MapPin, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { getShopOpenStatus, ShopInfo } from '../data/barberData';

interface HeroProps {
  shopInfo: ShopInfo;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ shopInfo, onOpenBooking }) => {
  const status = getShopOpenStatus();

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-24 bg-[#0B0D11]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Column 1: Copy and Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left"
          >
            {/* Live Status and Location indicator */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 text-xs"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium">
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {status.message}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="inline-flex items-center gap-1.5 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Santos Dumont, Pirapora - MG
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-2xl text-balance"
            >
              Seu estilo.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#D4AF37]">
                Sua identidade.
              </span>{' '}
              Seu melhor corte.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl text-balance"
            >
              Na OlyverDan Barber Shop, cada detalhe faz a diferença. Agende seu horário e renove seu visual com quem entende de precisão, tesoura e degradê.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold text-black bg-gradient-to-r from-[#E5B842] to-[#D4AF37] hover:from-[#ECC258] hover:to-[#DEB748] rounded-xl shadow-lg shadow-[#D4AF37]/15 hover:shadow-[#D4AF37]/25 transition-all uppercase tracking-wider whitespace-nowrap active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-black" />
                Agendar pelo WhatsApp
              </button>

              <a
                href="#galeria"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium text-neutral-200 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all whitespace-nowrap active:scale-[0.98]"
              >
                <Eye className="w-4 h-4 text-neutral-400" />
                Ver Cortes
              </a>
            </motion.div>

            {/* Value markers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-800/80 max-w-lg"
            >
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white tabular-nums">100%</span>
                <span className="text-xs text-neutral-400 mt-0.5">Foco no Detalhe</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-[#D4AF37] tabular-nums">08h - 20h</span>
                <span className="text-xs text-neutral-400 mt-0.5">Segunda a Sábado</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white tabular-nums">5.0 ★</span>
                <span className="text-xs text-neutral-400 mt-0.5">Avaliação em Pirapora</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Column 2: Marquee Barber Photograph (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] group">
              <img
                src="/src/assets/images/hero_barbershop_craft_1792868666649.jpg"
                alt="Barbeiro profissional realizando corte na OlyverDan Barber Shop"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-transparent to-transparent opacity-80" />

              {/* Floating tag inside photo */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0B0D11]/85 backdrop-blur-md border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-white">OlyverDan Barber Shop</h2>
                    <p className="text-[11px] text-neutral-400">Avenida Pio XII, 1053 · Pirapora MG</p>
                  </div>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-medium text-[#D4AF37] hover:underline"
                >
                  Agendar &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
