export interface BarberService {
  id: string;
  name: string;
  description: string;
  price: number; // in BRL
  durationMinutes: number;
  popular?: boolean;
}

export interface CutPhoto {
  id: string;
  title: string;
  category: 'Degradê' | 'Corte Social' | 'Corte Tradicional' | 'Barba';
  imageUrl: string;
  isClientPhoto: boolean; // false = demo ilustrativa, true = cliente real
  clientName?: string;
  dateAdded?: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verified?: boolean;
}

export interface ShopInfo {
  name: string;
  tagline: string;
  subtitle: string;
  barberName: string;
  whatsapp: string; // international without symbols
  whatsappDisplay: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  fullAddress: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export const INITIAL_SHOP_INFO: ShopInfo = {
  name: "OlyverDan Barber Shop",
  tagline: "Seu estilo. Sua identidade. Seu melhor corte.",
  subtitle: "Na OlyverDan Barber Shop, cada detalhe faz a diferença. Agende seu horário e renove seu visual.",
  barberName: "Olyver Dan",
  whatsapp: "5538999878059",
  whatsappDisplay: "(38) 99987-8059",
  address: "Avenida Pio XII, 1053",
  neighborhood: "Santos Dumont",
  city: "Pirapora",
  state: "MG",
  cep: "39270-000",
  fullAddress: "Avenida Pio XII, 1053, Santos Dumont, Pirapora – MG, CEP 39270-000",
  openingHours: {
    weekdays: "08:00 às 20:00",
    saturday: "08:00 às 20:00",
    sunday: "Fechado",
  },
};

export const INITIAL_SERVICES: BarberService[] = [
  {
    id: "corte-tradicional",
    name: "Corte Masculino Tradicional",
    description: "Corte clássico e alinhado feito na máquina e tesoura, ideal para o dia a dia com acabamento impecável na nuca e costeletas.",
    price: 35,
    durationMinutes: 30,
  },
  {
    id: "degrade-fade",
    name: "Degradê (Fade)",
    description: "Técnica de transição suave em navalha ou zero (Low Fade, Mid Fade ou High Fade) com acabamento milimétrico e penteado moderno.",
    price: 40,
    durationMinutes: 40,
    popular: true,
  },
  {
    id: "corte-tesoura",
    name: "Corte na Tesoura",
    description: "Corte 100% trabalhado na tesoura, valorizando o caimento natural dos fios, textura e formato do rosto.",
    price: 45,
    durationMinutes: 45,
  },
  {
    id: "corte-social",
    name: "Corte Social",
    description: "Estilo discreto, elegante e refinado para ambientes corporativos e eventos formais, com contorno limpo.",
    price: 35,
    durationMinutes: 30,
  },
  {
    id: "corte-infantil",
    name: "Corte Infantil",
    description: "Atendimento paciente, cuidadoso e divertido para crianças e jovens, garantindo conforto e estilo.",
    price: 35,
    durationMinutes: 35,
  },
  {
    id: "barba-acabamento",
    name: "Barba e Acabamento",
    description: "Alinhamento com toalha quente, navalha descartável, desenho das linhas da barba e hidratação com óleos essenciais.",
    price: 30,
    durationMinutes: 30,
  },
  {
    id: "corte-barba",
    name: "Corte + Barba Completo",
    description: "O combo mais pedido: renovação total do visual com corte personalizado e barba alinhada com toalha morna e pós-barba.",
    price: 65,
    durationMinutes: 60,
    popular: true,
  },
  {
    id: "pigmentacao",
    name: "Pigmentação e Acabamento",
    description: "Preenchimento de falhas e realce de contorno no cabelo ou na barba para um contraste marcante e fotogênico.",
    price: 25,
    durationMinutes: 25,
  },
];

export const INITIAL_CUTS: CutPhoto[] = [
  {
    id: "demo-cut-1",
    title: "Low Skin Fade com Textura",
    category: "Degradê",
    imageUrl: "/src/assets/images/cut_fade_degrade_1792868681703.jpg",
    isClientPhoto: false, // Demonstrativo inicial substituível
    clientName: "Demonstração de Estilo",
    dateAdded: "Disponível para substituição",
  },
  {
    id: "demo-cut-2",
    title: "Barba Alinhada e Contorno Definido",
    category: "Barba",
    imageUrl: "/src/assets/images/cut_barba_alinhada_1792868682374.jpg",
    isClientPhoto: false, // Demonstrativo inicial substituível
    clientName: "Demonstração de Estilo",
    dateAdded: "Disponível para substituição",
  },
  {
    id: "demo-cut-3",
    title: "Corte Social Taper com Penteado Lateral",
    category: "Corte Social",
    imageUrl: "/src/assets/images/cut_social_classic_1792868683092.jpg",
    isClientPhoto: false, // Demonstrativo inicial substituível
    clientName: "Demonstração de Estilo",
    dateAdded: "Disponível para substituição",
  },
  {
    id: "demo-cut-4",
    title: "Degradê Médio (Mid Fade) com Topo Natural",
    category: "Degradê",
    imageUrl: "/src/assets/images/hero_barbershop_craft_1792868666649.jpg",
    isClientPhoto: false,
    clientName: "Demonstração de Estilo",
    dateAdded: "Disponível para substituição",
  },
  {
    id: "demo-cut-5",
    title: "Corte Tradicional na Tesoura & Pente",
    category: "Corte Tradicional",
    imageUrl: "/src/assets/images/barbershop_interior_1792868682451.jpg",
    isClientPhoto: false,
    clientName: "Demonstração de Estilo",
    dateAdded: "Disponível para substituição",
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    clientName: "Marcos Vinicius",
    rating: 5,
    comment: "Melhor barbearia de Pirapora! O Olyver é extremamente detalhista no degradê e a pontualidade é nota 10. Recomendo demais.",
    date: "Há 2 semanas",
    verified: true,
  },
  {
    id: "rev-2",
    clientName: "Gabriel Santos",
    rating: 5,
    comment: "Ambiente muito agradável no Santos Dumont, atendimento de primeira e a barba fica impecável com a toalha quente. Não troco por outra.",
    date: "Há 1 mês",
    verified: true,
  },
  {
    id: "rev-3",
    clientName: "Rodrigo Almeida",
    rating: 5,
    comment: "Excelente profissional. Corto há tempos com ele e sempre acerta o visual. O pré-agendamento pelo WhatsApp facilita muito a vida.",
    date: "Há 1 mês",
    verified: true,
  },
];

// Helper to check if currently open in Pirapora local time
export function getShopOpenStatus(): { isOpen: boolean; message: string } {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(now);
  
  let weekday = "";
  let hour = 12;
  let minute = 0;
  
  for (const part of parts) {
    if (part.type === "weekday") weekday = part.value.toLowerCase();
    if (part.type === "hour") hour = parseInt(part.value, 10);
    if (part.type === "minute") minute = parseInt(part.value, 10);
  }
  
  if (weekday === "sunday") {
    return { isOpen: false, message: "Fechado hoje (Domingo) · Abre amanhã às 08h" };
  }
  
  const currentTotalMinutes = hour * 60 + minute;
  const openTime = 8 * 60; // 08:00
  const closeTime = 20 * 60; // 20:00
  
  if (currentTotalMinutes >= openTime && currentTotalMinutes < closeTime) {
    return { isOpen: true, message: "Aberto agora · Fecha às 20h" };
  } else if (currentTotalMinutes < openTime) {
    return { isOpen: false, message: "Fechado agora · Abre hoje às 08h" };
  } else {
    return { isOpen: false, message: "Fechado no momento · Abre amanhã às 08h" };
  }
}

// Generate official wa.me WhatsApp URL with encoded message
export function buildWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text.trim())}`;
}
