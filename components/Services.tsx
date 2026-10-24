import React from 'react';
import { Scissors, Clock, Sparkles, Flame, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarberService } from '../data/barberData';

interface ServicesProps {
  services: BarberService[];
  onSelectService: (service: BarberService) => void;
  onOpenBarberPanel: () => void;
}

export const Services: React.FC<ServicesProps> = ({
  services,
  onSelectService,
  onOpenBarberPanel,
}) => {
  return (
    <section id="servicos" className="py-20 bg-[#0F1217] border-y border-neutral-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">
              <Scissors className="w-3.5 h-3.5" />
              <span>Serviços & Cortes Especializados</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Escolha seu corte e renove o visual
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Cada atendimento inclui consultoria de visagismo, toalha e produtos de finalização para garantir a máxima durabilidade do seu corte.
            </p>
          </div>

          <button
            onClick={onOpenBarberPanel}
            className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Editar valores / serviços (Barbeiro)</span>
          </button>
        </motion.div>

        {/* Services Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative flex flex-col justify-between p-6 rounded-2xl bg-[#0B0D11] border transition-all duration-200 group ${
                service.popular
                  ? 'border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/5'
                  : 'border-neutral-800/90 hover:border-neutral-700'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 right-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#E5B842] to-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider shadow">
                  <Flame className="w-3 h-3 fill-black text-black" />
                  Mais Pedido
                </div>
              )}

              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:border-[#D4AF37]/40 transition-colors">
                  <Scissors className="w-5 h-5" />
                </div>

                <h3 className="font-display text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/80">
                <div className="flex items-baseline justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>~{service.durationMinutes} min</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 font-normal mr-1">R$</span>
                    <span className="font-display text-xl font-bold text-white tabular-nums">
                      {service.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-neutral-200 hover:text-black bg-neutral-900 hover:bg-[#D4AF37] border border-neutral-700 hover:border-[#D4AF37] rounded-xl transition-all flex items-center justify-center gap-2 group/btn active:scale-[0.98]"
                >
                  <span>Agendar Este Corte</span>
                  <span className="text-[#D4AF37] group-hover/btn:text-black transition-colors">&rarr;</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note on customizable pricing */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400"
        >
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              Preços e tempos são pré-configurados para a OlyverDan Barber Shop e podem ser atualizados a qualquer momento pelo proprietário no painel.
            </span>
          </div>
          <button
            onClick={() => onSelectService(services[0])}
            className="shrink-0 text-[#D4AF37] hover:underline font-medium"
          >
            Fazer agendamento geral &rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
};
