import React from 'react';
import { Star, MessageSquarePlus, ExternalLink, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReviewItem } from '../data/barberData';

interface ReviewsProps {
  reviews: ReviewItem[];
  onOpenAddReview: () => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, onOpenAddReview }) => {
  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const googleReviewUrl = "https://www.google.com/maps/search/?api=1&query=OlyverDan+Barber+Shop+Avenida+Pio+XII+Pirapora+MG";

  return (
    <section id="avaliacoes" className="py-20 bg-[#0F1217] border-y border-neutral-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span>Opinião de Quem Já Cortou</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Avaliações dos Clientes
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Depoimentos reais de quem confia no trabalho da OlyverDan Barber Shop em Pirapora.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors active:scale-[0.98]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Avaliar no Google</span>
            </a>

            <button
              onClick={onOpenAddReview}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-xl transition-colors uppercase tracking-wider active:scale-[0.98]"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Deixar Depoimento</span>
            </button>
          </div>
        </motion.div>

        {/* Rating Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 rounded-2xl bg-[#0B0D11] border border-neutral-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="text-4xl font-display font-extrabold text-[#D4AF37] tabular-nums">
              {averageRating}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#D4AF37] justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>
              <span className="text-xs text-neutral-400 mt-1 block">
                Média baseada em avaliações de clientes atendidos
              </span>
            </div>
          </div>

          <div className="text-xs text-neutral-400 text-center sm:text-right">
            <p className="text-neutral-200 font-medium">Você já cortou com o OlyverDan?</p>
            <p className="text-neutral-500 mt-0.5">Sua avaliação ajuda outros clientes a escolherem o corte ideal.</p>
          </div>
        </motion.div>

        {/* Reviews Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-[#0B0D11] border border-neutral-800/90 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-500">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">{rev.clientName}</h3>
                  <span className="text-[10px] text-neutral-500">Pirapora - MG</span>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Verificado
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
