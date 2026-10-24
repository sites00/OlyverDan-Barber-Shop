import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import { ReviewItem } from '../data/barberData';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: ReviewItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onAddReview,
}) => {
  const [clientName, setClientName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      clientName: clientName.trim(),
      rating,
      comment: comment.trim(),
      date: 'Recente',
      verified: true,
    };

    onAddReview(newRev);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-[#0F1217] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#0B0D11] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
              <Star className="w-4 h-4 fill-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Avaliar OlyverDan Barber
              </h3>
              <p className="text-[11px] text-neutral-400">
                Sua experiência real na barbearia em Pirapora
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Sua Nota
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                        : 'text-neutral-600'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-neutral-400 ml-2 font-medium">
                {rating} de 5 estrelas
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Seu Nome ou Iniciais
            </label>
            <input
              type="text"
              required
              placeholder="Ex: João Paulo"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Seu Comentário sobre o Atendimento / Corte
            </label>
            <textarea
              required
              rows={3}
              placeholder="Conte como foi seu corte, o atendimento e o que mais gostou na barbearia..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-xl transition-colors uppercase tracking-wider flex items-center justify-center gap-2 shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publicar Avaliação</span>
          </button>
        </form>
      </div>
    </div>
  );
};
