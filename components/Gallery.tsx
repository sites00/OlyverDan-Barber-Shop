import React, { useState } from 'react';
import { Camera, Plus, ZoomIn, CheckCircle2, Info, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CutPhoto } from '../data/barberData';

interface GalleryProps {
  cuts: CutPhoto[];
  onOpenAddModal: () => void;
  onDeleteCut?: (id: string) => void;
  onSelectCutForBooking: (cut: CutPhoto) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  cuts,
  onOpenAddModal,
  onSelectCutForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [lightboxCut, setLightboxCut] = useState<CutPhoto | null>(null);

  const categories = ['Todos', 'Degradê', 'Corte Social', 'Corte Tradicional', 'Barba'];

  const filteredCuts = selectedCategory === 'Todos'
    ? cuts
    : cuts.filter((c) => c.category === selectedCategory);

  const clientCutsCount = cuts.filter((c) => c.isClientPhoto).length;

  return (
    <section id="galeria" className="py-20 bg-[#0B0D11] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Portfólio & Trabalhos</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Confira nossos cortes e escolha seu estilo.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Trabalhos reais e estilos modernos executados na barbearia. Você pode salvar uma referência para mostrar ao barbeiro.
            </p>
          </div>

          {/* Quick Owner Action to Add Real Client Cut */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-black bg-gradient-to-r from-[#E5B842] to-[#D4AF37] hover:from-[#ECC258] hover:to-[#DEB748] rounded-xl shadow-md transition-all uppercase tracking-wider active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Adicionar Corte de Cliente
            </button>
          </div>
        </motion.div>

        {/* Notice for the Barber / User */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-4 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <p className="text-neutral-200 font-medium">
                Área de fotos reais de clientes pronta para uso!
              </p>
              <p className="text-neutral-400 mt-0.5">
                {clientCutsCount > 0
                  ? `Você já adicionou ${clientCutsCount} corte(s) real(is) de clientes. As fotos demonstrativas podem ser mantidas ou removidas a qualquer momento.`
                  : 'As fotos atuais são ilustrativas de demonstração. Clique no botão "Adicionar Corte de Cliente" para enviar as fotos reais de quem já cortou com você.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAddModal}
            className="shrink-0 text-xs text-[#D4AF37] hover:text-[#ECC258] font-semibold flex items-center gap-1.5"
          >
            <span>Enviar foto agora</span>
            <span>&rarr;</span>
          </button>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = cat === 'Todos' ? cuts.length : cuts.filter(c => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                    : 'bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat} <span className="opacity-70 tabular-nums text-[11px]">({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* Cuts Grid */}
        {filteredCuts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-neutral-900/40 border border-dashed border-neutral-800">
            <Camera className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">Nenhum corte nesta categoria ainda</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              Adicione fotos reais de clientes que já cortaram esse estilo com você.
            </p>
            <button
              onClick={onOpenAddModal}
              className="mt-4 px-4 py-2 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-lg"
            >
              + Adicionar Foto Agora
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredCuts.map((cut, index) => (
                <motion.div
                  layout
                  key={cut.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/90 hover:border-neutral-700 transition-all flex flex-col shadow-lg"
                >
                  {/* Image Container with Fallback */}
                  <div
                    className="relative aspect-[4/3] bg-neutral-950 overflow-hidden cursor-pointer"
                    onClick={() => setLightboxCut(cut)}
                  >
                    <img
                      src={cut.imageUrl}
                      alt={cut.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-medium text-white border border-white/10">
                        {cut.category}
                      </span>

                      {cut.isClientPhoto ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          Cliente Real
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md bg-amber-950/70 backdrop-blur-md border border-amber-500/30 text-[10px] font-medium text-amber-300">
                          Demonstração
                        </span>
                      )}
                    </div>

                    {/* Hover Overlay Zoom Indicator */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-medium border border-white/20">
                        <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                        Ampliar Foto
                      </span>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {cut.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-neutral-400 mt-1">
                        <span>{cut.clientName || 'Cliente OlyverDan'}</span>
                        {cut.dateAdded && (
                          <span className="text-[11px] text-neutral-500">{cut.dateAdded}</span>
                        )}
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center">
                      <button
                        onClick={() => onSelectCutForBooking(cut)}
                        className="w-full py-2 px-3 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow active:scale-[0.98]"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Quero Esse Estilo</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxCut && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setLightboxCut(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-3xl w-full bg-[#0F1217] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-black">
                  <img
                    src={lightboxCut.imageUrl}
                    alt={lightboxCut.title}
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => setLightboxCut(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-neutral-800 text-lg transition-colors"
                  >
                    &times;
                  </button>
                </div>

                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-[11px] text-neutral-300">
                        {lightboxCut.category}
                      </span>
                      {lightboxCut.isClientPhoto && (
                        <span className="text-emerald-400 text-xs font-medium">✓ Cliente Real</span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {lightboxCut.title}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {lightboxCut.clientName || 'Corte realizado na OlyverDan Barber Shop'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        const cur = lightboxCut;
                        setLightboxCut(null);
                        onSelectCutForBooking(cur);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-xl transition-colors uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Agendar Esse Estilo
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
