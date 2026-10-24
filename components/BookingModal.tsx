import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Scissors, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { BarberService, buildWhatsAppUrl, CutPhoto, ShopInfo } from '../data/barberData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: BarberService[];
  shopInfo: ShopInfo;
  preSelectedService?: BarberService | null;
  preSelectedCut?: CutPhoto | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  shopInfo,
  preSelectedService,
  preSelectedCut,
}) => {
  const [clientName, setClientName] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedService?.id || (services[0]?.id ?? '')
  );
  const [preferredDate, setPreferredDate] = useState('Hoje');
  const [customDate, setCustomDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (preSelectedService) {
      setSelectedServiceId(preSelectedService.id);
    }
  }, [preSelectedService]);

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  const timeOptions = [
    '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const dateFormatted = preferredDate === 'Outro dia' && customDate ? customDate : preferredDate;

    // Structured message according to brief requirements
    let message = `Olá! Vim pelo site da OlyverDan Barber Shop e gostaria de agendar um horário.\n\n`;
    if (clientName.trim()) {
      message += `• Nome: ${clientName.trim()}\n`;
    }
    if (currentService) {
      message += `• Serviço desejado: ${currentService.name} (R$ ${currentService.price.toFixed(2).replace('.', ',')})\n`;
    }
    if (preSelectedCut) {
      message += `• Referência de estilo escolhida: ${preSelectedCut.title}\n`;
    }
    message += `• Dia de preferência: ${dateFormatted}\n`;
    message += `• Horário de preferência: ${preferredTime}\n`;
    if (notes.trim()) {
      message += `• Observação: ${notes.trim()}\n`;
    }
    message += `\nGostaria de verificar os horários disponíveis com você!`;

    const url = buildWhatsAppUrl(shopInfo.whatsapp, message);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-lg w-full bg-[#0F1217] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-6 bg-[#0B0D11] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Agendamento via WhatsApp
              </h3>
              <p className="text-xs text-neutral-400">
                OlyverDan Barber Shop · Pirapora - MG
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reference Cut Preview if opened from a specific style */}
        {preSelectedCut && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3">
            <img
              src={preSelectedCut.imageUrl}
              alt={preSelectedCut.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="text-xs">
              <span className="text-[#D4AF37] font-semibold block">Estilo de Referência Selecionado</span>
              <p className="text-white font-medium">{preSelectedCut.title}</p>
            </div>
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSendToWhatsApp} className="p-6 space-y-4">
          {/* Client Name */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Seu Nome</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Carlos Eduardo"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Serviço Desejado</span>
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id} className="bg-neutral-900 text-white">
                  {s.name} — R$ {s.price.toFixed(2).replace('.', ',')} (~{s.durationMinutes} min)
                </option>
              ))}
            </select>
          </div>

          {/* Date Preference */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Dia de Preferência</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Hoje', 'Amanhã', 'Outro dia'].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setPreferredDate(option)}
                  className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                    preferredDate === option
                      ? 'bg-[#D4AF37] text-black font-semibold border-[#D4AF37]'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {preferredDate === 'Outro dia' && (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="mt-2 w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            )}
          </div>

          {/* Time Preference */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Horário de Preferência</span>
            </label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
            >
              {timeOptions.map((t) => (
                <option key={t} value={t} className="bg-neutral-900 text-white">
                  {t}h
                </option>
              ))}
            </select>
          </div>

          {/* Optional notes */}
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">
              Observações (opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Quero fazer um risco ou pigmentação"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Critical Disclaimer from brief */}
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-[11px] text-neutral-400 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <p>
              <strong className="text-neutral-300">Aviso importante:</strong> O agendamento só será confirmado após a resposta do barbeiro no WhatsApp, conforme a disponibilidade de horários.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 text-xs font-bold text-black bg-gradient-to-r from-[#E5B842] to-[#D4AF37] hover:from-[#ECC258] hover:to-[#DEB748] rounded-xl shadow-lg transition-all uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-black" />
            <span>Abrir WhatsApp com Agendamento</span>
          </button>
        </form>
      </div>
    </div>
  );
};
