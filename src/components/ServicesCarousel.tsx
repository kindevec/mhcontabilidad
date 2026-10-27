import React from 'react';
import { HaloReel, type HaloReelItem } from './ui/halo-reel';
import { servicesData } from '../data/services';
import { siteConfig } from '../data/siteConfig';

// Fotografías profesionales reales para cada uno de los 5 servicios oficiales
import contabilidadImg from '../assets/images/hero_contabilidad_asesoria_1792699795005.jpg';
import fiscalImg from '../assets/images/corporate_consulting_team_1792700513952.jpg';
import consultoriaImg from '../assets/images/hero_financial_advisor_skyline.jpg';
import nominaImg from '../assets/images/equipo_mh_contabilidad.jpg';
import tecnologiaImg from '../assets/images/digital_fintech_portal_1792700528199.jpg';

const serviceImages: Record<string, string> = {
  'contabilidad-general': contabilidadImg,
  'impuestos-blindaje-fiscal': fiscalImg,
  'consultoria-estrategia': consultoriaImg,
  'gestion-nomina-laboral': nominaImg,
  'tecnologia-facturacion-firmas': tecnologiaImg,
};

export interface ServicesCarouselProps {
  centerLabel?: React.ReactNode;
}

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ centerLabel }) => {
  const reelItems: HaloReelItem[] = servicesData.map((service) => {
    const waUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
      service.whatsappMessage
    )}`;

    return {
      src: serviceImages[service.id] || contabilidadImg,
      alt: service.title,
      title: service.title,
      tagline: service.tagline,
      whatsappUrl: waUrl,
      detailsUrl: '/servicios',
    };
  });

  return (
    <div className="w-full relative overflow-hidden">
      <HaloReel
        items={reelItems}
        slots={8}
        cardWidth={240}
        cardHeight={280}
        minScale={0.46}
        radiusXRatio={0.46}
        radiusYRatio={0.30}
        centerXRatio={0}
        autoPlay={true}
        holdDuration={2800}
        stepDuration={800}
        spread={1.3}
        centerLabel={centerLabel}
        showCenterLabel={!!centerLabel}
        className="h-[540px] sm:h-[600px]"
      />
    </div>
  );
};

export default ServicesCarousel;
