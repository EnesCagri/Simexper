"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  BeakerIcon,
  ChartBarIcon,
  CommandLineIcon,
  ArrowPathIcon,
  CogIcon,
  CloudArrowUpIcon,
  CubeTransparentIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon,
  ServerIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

// Update the keyframes animation at the top
const starKeyframes = `
@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

@keyframes float {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  25% { transform: translate(-50%, -50%) translateY(-10px) rotate(1deg); }
  50% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
  75% { transform: translate(-50%, -50%) translateY(10px) rotate(-1deg); }
  100% { transform: translate(-50%, -50%) rotate(0deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}
`;

// Calculate angles for 8 cards evenly spaced in a circle
const TOTAL_CARDS = 8;
const ANGLE_STEP = 360 / TOTAL_CARDS;

const features = [
  {
    title: "Kendi Kendine Hizmet Ortamları",
    description:
      "Kendi fizik simülasyonlarınızı kolayca oluşturun ve özelleştirin.",
    icon: BeakerIcon,
    angle: 0,
    animationDelay: 0,
  },
  {
    title: "Gerçek Zamanlı Kayıt",
    description:
      "Simülasyon verilerini anlık olarak analiz edin ve görselleştirin.",
    icon: ChartBarIcon,
    angle: ANGLE_STEP,
    animationDelay: 1,
  },
  {
    title: "Komut Satırı Araçları",
    description: "Güçlü CLI araçlarıyla simülasyonları kontrol edin.",
    icon: CommandLineIcon,
    angle: ANGLE_STEP * 2,
    animationDelay: 2,
  },
  {
    title: "Kaynak Kontrolü",
    description: "Simülasyon kaynaklarını optimize edin ve izleyin.",
    icon: CubeTransparentIcon,
    angle: ANGLE_STEP * 3,
    animationDelay: 3,
  },
  {
    title: "Ekip İşbirliği",
    description: "Ekip çalışması için gelişmiş iş birliği özellikleri.",
    icon: UserGroupIcon,
    angle: ANGLE_STEP * 4,
    animationDelay: 4,
  },
  {
    title: "Performans İzleme",
    description: "Gerçek zamanlı performans izleme ve analiz.",
    icon: ClockIcon,
    angle: ANGLE_STEP * 5,
    animationDelay: 5,
  },
  {
    title: "Güvenlik Kontrolleri",
    description: "Gelişmiş güvenlik kontrolleri ve yetkilendirme.",
    icon: ShieldCheckIcon,
    angle: ANGLE_STEP * 6,
    animationDelay: 6,
  },
  {
    title: "API Entegrasyonu",
    description: "Kolay entegrasyon için kapsamlı API desteği.",
    icon: CodeBracketIcon,
    angle: ANGLE_STEP * 7,
    animationDelay: 7,
  },
];

const RADIUS = 400; // Increased radius for more spacing

export function FeaturesGrid() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [stars, setStars] = useState<
    Array<{
      width: number;
      height: number;
      backgroundColor: string;
      left: number;
      top: number;
      animation: string;
    }>
  >([]);
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      animation: string;
    }>
  >([]);

  useEffect(() => {
    // Generate stars only on client side
    const newStars = [...Array(100)].map(() => ({
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animation: `twinkle ${Math.random() * 3 + 2}s infinite ${
        Math.random() * 2
      }s`,
    }));
    setStars(newStars);

    // Generate floating particles only on client side
    const newParticles = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `float ${Math.random() * 4 + 4}s infinite ease-in-out ${
        Math.random() * 2
      }s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="py-24 overflow-hidden bg-[#020817] relative min-h-screen">
      {/* Add style tag for animations */}
      <style>{starKeyframes}</style>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a237e,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent,#020817_70%)] opacity-90" />

        {/* Add twinkling stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: star.width + "px",
              height: star.height + "px",
              backgroundColor: star.backgroundColor,
              left: star.left + "%",
              top: star.top + "%",
              animation: star.animation,
            }}
          />
        ))}

        {/* Add floating particles */}
        {particles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-blue-400/20"
            style={{
              left: particle.left,
              top: particle.top,
              animation: particle.animation,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-medium text-white mb-6"
          >
            Tek Platformda Tüm
            <br />
            Simülasyon İhtiyaçları
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Simexper, fizik simülasyonlarını oluşturmanıza ve yönetmenize
            yardımcı olurken, ekiplerin hizmet ve ortam yönetimini
            standartlaştırmasını ve otomatikleştirmesini sağlar.
          </motion.p>
        </div>

        <div className="relative" style={{ height: "900px" }}>
          {/* Center Logo with larger glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div
                className="absolute -inset-16 bg-blue-500/10 rounded-full blur-3xl"
                style={{ animation: "pulse 4s infinite" }}
              />
              <div
                className="absolute -inset-12 bg-blue-500/20 rounded-full blur-2xl"
                style={{ animation: "pulse 4s infinite 1s" }}
              />
              <div
                className="absolute -inset-8 bg-blue-500/30 rounded-full blur-xl"
                style={{ animation: "pulse 4s infinite 2s" }}
              />
              <div className="relative w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/images/general/logo.png"
                    alt="Simexper Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          {features.map((feature, index) => {
            const angleRad = (feature.angle * Math.PI) / 180;
            // Adjust the radius calculation to be relative to viewport
            const x = Math.cos(angleRad) * RADIUS;
            const y = Math.sin(angleRad) * RADIUS;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="absolute w-[250px]"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  animation: `float ${6 + index * 0.5}s infinite ease-in-out ${
                    index * 0.5
                  }s`,
                }}
              >
                <div
                  className="relative cursor-pointer group"
                  onMouseEnter={() => setActiveCard(feature.title)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                  <div className="relative bg-[#0A1128]/80 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-6 group-hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-3">
                        <feature.icon className="w-6 h-6 text-blue-400" />
                        <h3 className="text-base font-medium text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Connection lines with adjusted positioning */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {features.map((feature, index) => {
              const angleRad = (feature.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * RADIUS + RADIUS;
              const y = Math.sin(angleRad) * RADIUS + 450;

              return (
                <motion.line
                  key={index}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.1 }}
                  transition={{
                    duration: 1.5,
                    delay: feature.animationDelay * 0.1,
                  }}
                  x1="50%"
                  y1="50%"
                  x2={x}
                  y2={y}
                  stroke="url(#blueGradient)"
                  strokeWidth="1"
                />
              );
            })}
            <defs>
              <linearGradient
                id="blueGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1a237e" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#3949ab" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1a237e" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
