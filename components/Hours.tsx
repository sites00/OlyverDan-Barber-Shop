import React from 'react';
import { Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { getShopOpenStatus, ShopInfo } from '../data/barberData';

interface HoursProps {
  shopInfo: ShopInfo;
  onOpenBooking: () => void;
}

export const Hours: React.FC<HoursProps> = ({ shopInfo, onOpenBooking }) => {
  const status = getShopOpenStatus();
  const currentDayIndex = new Date().getDay();

  const scheduleDays = [
    { day: 'Segunda-feira', hours: shopInfo.openingHours.weekdays, dayIndex: 1 },
    { day: 'Terça-feira', hours: shopInfo.openingHours.weekdays, dayIndex: 2 },
    { day: 'Quarta-feira', hours: shopInfo.openingHours.weekdays, dayIndex: 3 },
    { day: 'Quinta-feira', hours: shopInfo.openingHours.weekdays, dayIndex: 4 },
    { day: 'Sexta-feira', hours: shopInfo.openingHours.weekdays, dayIndex: 5 },
    { day: 'Sábado', hours: shopInfo.openingHours.saturday, dayIndex: 6 },
    { day: 'Domingo', hours: shopInfo.openingHours.sunday, dayIndex: 0, isClosed: true },
  ];

  return (
    <section id="horarios" className="py-20 bg-[#0B0D11] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Atendimento & Agendas</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Horários de Funcionamento
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Trabalhamos com horário agendado para garantir que você não perca tempo esperando na fila.
          </p>
        </motion.div>

        {/* Live Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              status.isOpen
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {status.isOpen ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-xs text-neutral-400">Status em tempo real</span>
              <p className="text-sm font-bold text-white">{status.message}</p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-xl transition-colors uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Calendar className="w-3.5 h-3.5" />
            Agendar Horário
          </button>
        </motion.div>

        {/* Schedule Table */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 divide-y divide-neutral-800/80 shadow-lg"
        >
          {scheduleDays.map((item, index) => {
            const isToday = currentDayIndex === item.dayIndex;
            return (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-4 sm:px-6 flex items-center justify-between transition-colors ${
                  isToday ? 'bg-[#D4AF37]/10' : 'hover:bg-neutral-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${isToday ? 'text-white font-bold' : 'text-neutral-300'}`}>
                    {item.day}
                  </span>
                  {isToday && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37] text-black">
                      Hoje
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs tabular-nums ${
                    item.isClosed
                      ? 'text-neutral-500 font-medium'
                      : isToday
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-neutral-200'
                  }`}>
                    {item.hours}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="text-center text-xs text-neutral-500 mt-4">
          * Horários especiais em feriados são avisados previamente no WhatsApp.
        </p>
      </div>
    </section>
  );
};
