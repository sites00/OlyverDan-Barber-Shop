/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Hours } from './components/Hours';
import { Reviews } from './components/Reviews';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { BarberPanelModal } from './components/BarberPanelModal';
import { ReviewModal } from './components/ReviewModal';
import {
  BarberService,
  CutPhoto,
  INITIAL_CUTS,
  INITIAL_REVIEWS,
  INITIAL_SERVICES,
  INITIAL_SHOP_INFO,
  ReviewItem,
  ShopInfo,
} from './data/barberData';

export default function App() {
  // Load persisted state or defaults
  const [shopInfo, setShopInfo] = useState<ShopInfo>(() => {
    try {
      const saved = localStorage.getItem('olyverdan_shop_info');
      return saved ? JSON.parse(saved) : INITIAL_SHOP_INFO;
    } catch {
      return INITIAL_SHOP_INFO;
    }
  });

  const [services, setServices] = useState<BarberService[]>(() => {
    try {
      const saved = localStorage.getItem('olyverdan_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [cuts, setCuts] = useState<CutPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('olyverdan_cuts');
      return saved ? JSON.parse(saved) : INITIAL_CUTS;
    } catch {
      return INITIAL_CUTS;
    }
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('olyverdan_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Modal visibility states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [barberPanelOpen, setBarberPanelOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Pre-selected items for booking flow
  const [preSelectedService, setPreSelectedService] = useState<BarberService | null>(null);
  const [preSelectedCut, setPreSelectedCut] = useState<CutPhoto | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('olyverdan_shop_info', JSON.stringify(shopInfo));
  }, [shopInfo]);

  useEffect(() => {
    localStorage.setItem('olyverdan_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('olyverdan_cuts', JSON.stringify(cuts));
  }, [cuts]);

  useEffect(() => {
    localStorage.setItem('olyverdan_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Handlers
  const handleOpenBooking = () => {
    setPreSelectedService(null);
    setPreSelectedCut(null);
    setBookingModalOpen(true);
  };

  const handleSelectServiceForBooking = (service: BarberService) => {
    setPreSelectedService(service);
    setPreSelectedCut(null);
    setBookingModalOpen(true);
  };

  const handleSelectCutForBooking = (cut: CutPhoto) => {
    setPreSelectedCut(cut);
    // Find matching service if any
    const match = services.find((s) => s.name.toLowerCase().includes(cut.category.toLowerCase())) || services[0];
    setPreSelectedService(match);
    setBookingModalOpen(true);
  };

  const handleDeleteCut = (id: string) => {
    const updated = cuts.filter((c) => c.id !== id);
    setCuts(updated);
  };

  const handleAddReview = (newReview: ReviewItem) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="min-h-screen bg-[#0B0D11] text-[#E5E7EB] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-white">
      {/* 1. Header / Top Navigation Bar */}
      <Navbar
        shopInfo={shopInfo}
        onOpenBooking={handleOpenBooking}
        onOpenBarberPanel={() => setBarberPanelOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 2. Banner Principal / Hero */}
        <Hero
          shopInfo={shopInfo}
          onOpenBooking={handleOpenBooking}
        />

        {/* 3. Serviços e Tipos de Corte */}
        <Services
          services={services}
          onSelectService={handleSelectServiceForBooking}
          onOpenBarberPanel={() => setBarberPanelOpen(true)}
        />

        {/* 4. Galeria de Fotos dos Cortes & Clientes Reais */}
        <Gallery
          cuts={cuts}
          onOpenAddModal={() => setBarberPanelOpen(true)}
          onDeleteCut={handleDeleteCut}
          onSelectCutForBooking={handleSelectCutForBooking}
        />

        {/* 5. Sobre a Barbearia & Barbeiro */}
        <About
          shopInfo={shopInfo}
          onOpenBooking={handleOpenBooking}
        />

        {/* 6. Horários de Funcionamento */}
        <Hours
          shopInfo={shopInfo}
          onOpenBooking={handleOpenBooking}
        />

        {/* 7. Avaliações dos Clientes */}
        <Reviews
          reviews={reviews}
          onOpenAddReview={() => setReviewModalOpen(true)}
        />

        {/* 8. Endereço, Mapa e Contato */}
        <LocationContact
          shopInfo={shopInfo}
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* 9. Rodapé com Informações */}
      <Footer
        shopInfo={shopInfo}
        onOpenBarberPanel={() => setBarberPanelOpen(true)}
      />

      {/* 10. Botão Flutuante de WhatsApp */}
      <FloatingWhatsApp onOpenBooking={handleOpenBooking} />

      {/* Interactive WhatsApp Pre-Scheduling Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        services={services}
        shopInfo={shopInfo}
        preSelectedService={preSelectedService}
        preSelectedCut={preSelectedCut}
      />

      {/* Dedicated Barber Panel Modal (Add Real Client Cuts, Edit Prices & Hours) */}
      <BarberPanelModal
        isOpen={barberPanelOpen}
        onClose={() => setBarberPanelOpen(false)}
        cuts={cuts}
        onSaveCuts={setCuts}
        services={services}
        onSaveServices={setServices}
        shopInfo={shopInfo}
        onSaveShopInfo={setShopInfo}
      />

      {/* Client Review Submission Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </div>
  );
}
