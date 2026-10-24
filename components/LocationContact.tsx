import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Copy, Check, Instagram, MessageCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { buildWhatsAppUrl, ShopInfo } from '../data/barberData';

interface LocationContactProps {
  shopInfo: ShopInfo;
  onOpenBooking: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({
  shopInfo,
  onOpenBooking,
}) => {
  const [copied, setCopied] = useState(false);

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Avenida Pio XII, 1053, Santos Dumont, Pirapora - MG, 39270-000'
  )}`;

  const directWhatsAppUrl = buildWhatsAppUrl(
    shopInfo.whatsapp,
    'Olá! Vim pelo site da OlyverDan Barber Shop e gostaria de tirar uma dúvida.'
  );

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(shopInfo.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="localizacao" className="py-20 bg-[#0B0D11] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Fácil Acesso em Pirapora</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Localização e Contato
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Venha nos visitar no bairro Santos Dumont. Espaço com fácil estacionamento na porta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div className="space-y-6">
              {/* Address Block */}
              <div>
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Endereço Completo
                </span>
                <p className="text-base font-bold text-white">
                  {shopInfo.address}
                </p>
                <p className="text-sm text-neutral-300">
                  {shopInfo.neighborhood}, {shopInfo.city} – {shopInfo.state}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  CEP: {shopInfo.cep}
                </p>

                <button
                  onClick={handleCopyAddress}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700/60 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Endereço Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copiar Endereço</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Contact */}
              <div className="pt-4 border-t border-neutral-800/80">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  WhatsApp & Telefone
                </span>
                <p className="text-lg font-bold text-white tabular-nums">
                  {shopInfo.whatsappDisplay}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Atendimento direto com o barbeiro {shopInfo.barberName}
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-neutral-800/80">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2">
                  Redes Sociais
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-800 text-neutral-200 hover:text-white hover:bg-neutral-700 text-xs font-medium transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#D4AF37]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-800 text-neutral-200 hover:text-white hover:bg-neutral-700 text-xs font-medium transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-6 border-t border-neutral-800 space-y-3">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 px-4 text-xs font-bold text-black bg-gradient-to-r from-[#E5B842] to-[#D4AF37] hover:from-[#ECC258] hover:to-[#DEB748] rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com o Barbeiro
              </button>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-medium text-neutral-200 hover:text-white bg-neutral-800/90 hover:bg-neutral-800 rounded-xl transition-colors flex items-center justify-center gap-2 border border-neutral-700 active:scale-[0.98]"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
                <span>Como Chegar (Google Maps / Waze)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </motion.div>

          {/* Interactive Google Maps Frame (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-900 min-h-[350px] lg:min-h-full relative flex flex-col"
          >
            <iframe
              title="Localização OlyverDan Barber Shop Pirapora MG"
              src="https://maps.google.com/maps?q=Avenida%20Pio%20XII,%201053,%20Santos%20Dumont,%20Pirapora%20MG&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[380px] border-0 grayscale contrast-125 invert-[0.9] hue-rotate-180"
              loading="lazy"
              allowFullScreen
            />
            {/* Map overlay bar with quick directions link */}
            <div className="p-3 bg-[#0B0D11] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 px-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Pirapora, Minas Gerais
              </span>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:underline font-medium"
              >
                Abrir no app de mapas &rarr;
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
