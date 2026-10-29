import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  LiquidGlassCarousel,
  type LiquidGlassCarouselItem,
} from './components/ui/liquid-glass-carousel';

export const bestProjectItems: LiquidGlassCarouselItem[] = [
  {
    title: "SONARIQ — AI Startup Validation Panel",
    src: "/assets/best-project/sonariq.jpeg",
    aspect: 1592 / 847,
  },
  {
    title: "SCOUT — India-First Multi-Platform Search",
    src: "/assets/best-project/scout.jpeg",
    aspect: 1600 / 858,
  },
  {
    title: "DilliJalNav Edge — Real-Time Water & Route Navigation",
    src: "/assets/best-project/delhijalnav-edge.jpeg",
    aspect: 1600 / 830,
  },
  {
    title: "SatQuery AI — Geospatial Flood & Satellite Analytics",
    src: "/assets/best-project/satquery.jpeg",
    aspect: 1312 / 628,
  },
  {
    title: "KiranaMate — Autonomous Retail & WhatsApp Swarm",
    src: "/assets/best-project/kiranamate.jpeg",
    aspect: 1080 / 561,
  },
  {
    title: "MediaPipe ASL — Real-Time Gesture Recognition",
    src: "/assets/best-project/asl-sign.jpeg",
    aspect: 1448 / 1086,
  },
  {
    title: "THE SIGNAL — Editorial Tech & Intelligence Publication",
    src: "/assets/best-project/the-signal-ui.png",
    aspect: 1600 / 866,
  },
];

export function mountLiquidCarousel(containerId = 'liquid-carousel-root') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const root = createRoot(container);
  root.render(
    <LiquidGlassCarousel
      items={bestProjectItems}
      background="#F4EFE6"
      className="w-full h-full min-h-[550px]"
    />
  );
  return root;
}
