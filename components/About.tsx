import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShopInfo } from '../data/barberData';

interface AboutProps {
  shopInfo: ShopInfo;
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ shopInfo, onOpenBooking }) => {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Higiene & Biossegurança',
      desc: 'Lâminas e navalhas 100% descartáveis, instrumentos esterilizados e toalhas higienizadas.',
    },
    {
      icon: Sparkles,
      title: 'Precisão e Visagismo',
      desc: 'Cada formato de rosto e tipo de fio pede uma técnica sob medida para valorizar sua fisionomia.',
    },
    {
      icon: HeartHandshake,
      title: 'Pontualidade de Horário',
      desc: 'Respeito total ao seu tempo através do agendamento organizado pelo WhatsApp.',
    },
    {
      icon: Award,
      title: 'Ambiente Climatizado',
      desc: 'Espaço moderno, acolhedor e com som agradável no coração do Santos Dumont em Pirapora.',
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-[#0F1217] border-y border-neutral-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Barbershop Ambience Photography (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5] group">
              <img
                src="/src/assets/images/barbershop_interior_1792868682451.jpg"
                alt="Ambiente interno da OlyverDan Barber Shop em Pirapora"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1217] via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#0B0D11]/90 backdrop-blur-md border border-neutral-800">
                <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Barbeiro Responsável
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {shopInfo.barberName}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Especialista em tesoura, alinhamento de barba e técnicas avançadas de degradê (fade).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Story and Values (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <span>Sobre a OlyverDan Barber Shop</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Mais que um corte de cabelo: uma experiência de cuidado e confiança.
            </h2>

            {/* Prompt's exact suggested quote */}
            <blockquote className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-sm sm:text-base leading-relaxed italic">
              "Na OlyverDan Barber Shop, acreditamos que um bom corte vai além da aparência. É sobre confiança, personalidade e estilo. Nosso objetivo é oferecer um atendimento cuidadoso e um visual que combine com você."
            </blockquote>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Localizada na Avenida Pio XII, em Pirapora – MG, a OlyverDan Barber Shop foi pensada para o homem moderno que busca excelência técnica sem complicações. Aqui você encontra um ambiente aconchegante, pontualidade no atendimento e o carinho com cada detalhe do seu corte e barba.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((h, i) => {
                const IconComponent = h.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="p-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs font-bold text-white">{h.title}</h3>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-normal pl-8">
                      {h.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-xl transition-all uppercase tracking-wider shadow active:scale-[0.98]"
              >
                Conversar com o Barbeiro no WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
