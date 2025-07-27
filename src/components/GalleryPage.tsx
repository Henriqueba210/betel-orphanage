import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, Construction, Video, Clock } from 'lucide-react';
import GalleryGrid from './GalleryGrid';

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  type: 'image' | 'video';
}

interface GalleryCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  items: GalleryItem[];
}

const galleryData: GalleryCategory[] = [
  {
    id: 'construction',
    title: '🏗️ Construção',
    description: 'Acompanhe o progresso da construção do centro',
    icon: <Construction size={20} />,
    items: [
      { src: "/images/page_11_img_1.jpeg", alt: "Construção do centro", caption: "Início das obras", type: 'image' },
      { src: "/images/page_11_img_2.jpeg", alt: "Fundações", caption: "Fundações do edifício", type: 'image' },
      { src: "/images/page_14_img_1.jpeg", alt: "Estrutura", caption: "Estrutura em construção", type: 'image' },
      { src: "/images/page_15_img_1.jpeg", alt: "Paredes", caption: "Levantamento de paredes", type: 'image' },
      { src: "/images/page_15_img_2.jpeg", alt: "Interior", caption: "Trabalho no interior", type: 'image' },
      { src: "/images/page_15_img_3.jpeg", alt: "Detalhes", caption: "Detalhes da construção", type: 'image' },
      { src: "/images/page_16_img_1.jpeg", alt: "Progresso", caption: "Progresso das obras", type: 'image' },
      { src: "/images/page_16_img_2.jpeg", alt: "Estrutura", caption: "Estrutura principal", type: 'image' },
      { src: "/images/page_16_img_3.jpeg", alt: "Trabalho", caption: "Trabalho em equipe", type: 'image' },
      { src: "/images/page_17_img_1.jpeg", alt: "Detalhes", caption: "Detalhes arquitetónicos", type: 'image' },
      { src: "/images/page_17_img_2.jpeg", alt: "Construção", caption: "Fase da construção", type: 'image' },
      { src: "/images/page_17_img_3.jpeg", alt: "Obras", caption: "Obras em andamento", type: 'image' },
      { src: "/images/page_17_img_4.jpeg", alt: "Progresso", caption: "Progresso recente", type: 'image' },
      { src: "/images/page_18_img_1.jpeg", alt: "Estrutura", caption: "Estrutura metálica", type: 'image' },
      { src: "/images/page_18_img_2.png", alt: "Planta", caption: "Planta do projeto", type: 'image' },
      { src: "/images/page_18_img_3.jpeg", alt: "Construção", caption: "Detalhes construtivos", type: 'image' },
      { src: "/images/page_18_img_4.jpeg", alt: "Obras", caption: "Obras em progresso", type: 'image' }
    ]
  },
  {
    id: 'community',
    title: '👥 Comunidade',
    description: 'A comunidade local e as crianças que serão beneficiadas',
    icon: <Users size={20} />,
    items: [
      { src: "/images/page_1_img_1.png", alt: "Crianças da comunidade", caption: "Crianças locais", type: 'image' },
      { src: "/images/page_3_img_1.jpeg", alt: "Famílias", caption: "Famílias da região", type: 'image' },
      { src: "/images/page_4_img_1.jpeg", alt: "Comunidade", caption: "Membros da comunidade", type: 'image' },
      { src: "/images/page_4_img_2.jpeg", alt: "Crianças", caption: "Crianças órfãs", type: 'image' },
      { src: "/images/page_5_img_1.jpeg", alt: "Famílias", caption: "Famílias beneficiadas", type: 'image' },
      { src: "/images/page_6_img_1.jpeg", alt: "Comunidade", caption: "Encontro comunitário", type: 'image' },
      { src: "/images/page_6_img_2.jpeg", alt: "Crianças", caption: "Crianças brincando", type: 'image' },
      { src: "/images/page_6_img_3.jpeg", alt: "Famílias", caption: "Famílias locais", type: 'image' },
      { src: "/images/page_6_img_4.jpeg", alt: "Comunidade", caption: "Reunião comunitária", type: 'image' },
      { src: "/images/page_7_img_1.jpeg", alt: "Crianças", caption: "Crianças da região", type: 'image' },
      { src: "/images/page_7_img_2.jpeg", alt: "Famílias", caption: "Famílias beneficiadas", type: 'image' },
      { src: "/images/page_8_img_1.jpeg", alt: "Comunidade", caption: "Comunidade local", type: 'image' },
      { src: "/images/page_8_img_2.jpeg", alt: "Crianças", caption: "Crianças órfãs", type: 'image' },
      { src: "/images/page_8_img_3.jpeg", alt: "Famílias", caption: "Famílias da região", type: 'image' },
      { src: "/images/page_9_img_1.jpeg", alt: "Comunidade", caption: "Encontro comunitário", type: 'image' },
      { src: "/images/page_9_img_2.jpeg", alt: "Crianças", caption: "Crianças brincando", type: 'image' },
      { src: "/images/page_9_img_3.jpeg", alt: "Famílias", caption: "Famílias locais", type: 'image' },
      { src: "/images/page_9_img_4.jpeg", alt: "Comunidade", caption: "Reunião comunitária", type: 'image' }
    ]
  },
  {
    id: 'recent',
    title: '📸 Fotos Recentes',
    description: 'As últimas fotos do projeto e da construção',
    icon: <Clock size={20} />,
    items: [
      { src: "/images/IMG-20250710-WA0061.jpg", alt: "Foto recente 1", caption: "Progresso recente", type: 'image' },
      { src: "/images/IMG-20250710-WA0060.jpg", alt: "Foto recente 2", caption: "Obras em andamento", type: 'image' },
      { src: "/images/IMG-20250710-WA0059.jpg", alt: "Foto recente 3", caption: "Detalhes da construção", type: 'image' },
      { src: "/images/IMG-20250710-WA0058.jpg", alt: "Foto recente 4", caption: "Trabalho em equipe", type: 'image' },
      { src: "/images/IMG-20250710-WA0057.jpg", alt: "Foto recente 5", caption: "Estrutura em progresso", type: 'image' },
      { src: "/images/IMG-20250710-WA0056.jpg", alt: "Foto recente 6", caption: "Detalhes arquitetónicos", type: 'image' },
      { src: "/images/IMG-20250710-WA0054.jpg", alt: "Foto recente 7", caption: "Construção avançada", type: 'image' },
      { src: "/images/IMG-20250710-WA0053.jpg", alt: "Foto recente 8", caption: "Obras recentes", type: 'image' },
      { src: "/images/IMG-20250710-WA0052.jpg", alt: "Foto recente 9", caption: "Progresso da obra", type: 'image' },
      { src: "/images/IMG-20250710-WA0051.jpg", alt: "Foto recente 10", caption: "Detalhes construtivos", type: 'image' },
      { src: "/images/IMG-20250710-WA0050.jpg", alt: "Foto recente 11", caption: "Trabalho em andamento", type: 'image' },
      { src: "/images/IMG-20250710-WA0049.jpg", alt: "Foto recente 12", caption: "Estrutura principal", type: 'image' }
    ]
  },
  {
    id: 'videos',
    title: '🎥 Vídeos',
    description: 'Vídeos do progresso da construção e da comunidade',
    icon: <Video size={20} />,
    items: [
      { src: "/images/VID-20250710-WA0009.mp4", alt: "Vídeo 1", caption: "Progresso da construção", type: 'video' },
      { src: "/images/VID-20250710-WA0008.mp4", alt: "Vídeo 2", caption: "Obras em andamento", type: 'video' },
      { src: "/images/VID-20250710-WA0007.mp4", alt: "Vídeo 3", caption: "Trabalho em equipe", type: 'video' },
      { src: "/images/VID-20250710-WA0006.mp4", alt: "Vídeo 4", caption: "Detalhes da obra", type: 'video' },
      { src: "/images/VID-20250710-WA0005.mp4", alt: "Vídeo 5", caption: "Construção avançada", type: 'video' },
      { src: "/images/VID-20250710-WA0004.mp4", alt: "Vídeo 6", caption: "Progresso recente", type: 'video' },
      { src: "/images/VID-20250710-WA0003.mp4", alt: "Vídeo 7", caption: "Obras em progresso", type: 'video' },
      { src: "/images/VID-20250710-WA0002.mp4", alt: "Vídeo 8", caption: "Trabalho em andamento", type: 'video' }
    ]
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Create "all" category with all items
  const allItems = galleryData.flatMap(category => category.items);
  const allCategory: GalleryCategory = {
    id: 'all',
    title: '📷 Todas as Fotos',
    description: 'Todas as fotos do projeto organizadas cronologicamente',
    icon: <Camera size={20} />,
    items: allItems
  };

  const categories = [allCategory, ...galleryData];
  const currentCategory = categories.find(cat => cat.id === activeCategory) || allCategory;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Hero Section */}
      <div className="hero min-h-[40vh] bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-base-content mb-6">
              📸 Galeria de Fotos
            </h1>
            <p className="text-xl text-base-content/80">
              Acompanhe o progresso da construção do Centro de Acolhimento Betel através das nossas fotos e vídeos
            </p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`btn ${activeCategory === category.id ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              {category.title.split(' ')[0]} {/* Show only emoji and first word */}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gallery Content */}
      <div className="container mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GalleryGrid
              items={currentCategory.items}
              title={currentCategory.title}
              description={currentCategory.description}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 