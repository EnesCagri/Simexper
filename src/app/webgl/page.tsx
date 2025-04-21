"use client";

import UnityGame from "@/components/UnityGame";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Rocket,
  Gamepad2,
  Maximize2,
  Info,
  BookOpen,
  Play,
  X,
  ChevronRight,
  ChevronLeft,
  Star,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const snapshots = [
  {
    title: "Başlangıç Ekranı",
    description: "Simülasyonun ana menüsü ve kontrol paneli",
    image: "/images/snapshots/start-screen.jpg",
  },
  {
    title: "Deney Modu",
    description: "Parametreleri ayarlayıp deney yapabileceğiniz ekran",
    image: "/images/snapshots/experiment-mode.jpg",
  },
  {
    title: "Sonuç Analizi",
    description: "Deney sonuçlarını grafiklerle analiz etme",
    image: "/images/snapshots/analysis.jpg",
  },
];

const learningObjectives = [
  "Basit harmonik hareket",
  "Yay sabiti (k)",
  "Kütle (m)",
  "Genlik (A)",
  "Periyot (T)",
  "Frekans (f)",
];

const reviews = [
  {
    user: "Ahmet Y.",
    rating: 5,
    comment: "Çok etkileyici bir simülasyon. Yayın hareketini çok iyi anladım.",
    date: "2024-03-15",
  },
  {
    user: "Ayşe K.",
    rating: 4,
    comment:
      "Görsel olarak çok iyi, ancak biraz daha detaylı açıklama eklenebilir.",
    date: "2024-03-10",
  },
];

export default function SimulationPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSnapshots, setShowSnapshots] = useState(false);
  const [currentSnapshot, setCurrentSnapshot] = useState(0);
  const [showPhysics, setShowPhysics] = useState(true);
  const [showReviews, setShowReviews] = useState(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const nextSnapshot = () => {
    setCurrentSnapshot((prev) => (prev + 1) % snapshots.length);
  };

  const prevSnapshot = () => {
    setCurrentSnapshot(
      (prev) => (prev - 1 + snapshots.length) % snapshots.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/simulations" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Geri
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSnapshots(true)}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Nasıl Kullanılır
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInfo(true)}
              className="flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              Bilgi
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="flex items-center gap-2"
            >
              <Maximize2 className="h-4 w-4" />
              {isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran"}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 bg-opacity-10">
              <Rocket className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                Fizik Simülasyonu
              </h1>
              <p className="text-muted-foreground">
                İnteraktif 3D Fizik Deneyleri
              </p>
            </div>
          </div>
        </motion.div>

        {/* Game Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative rounded-xl overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm mb-8"
        >
          {/* Aspect Ratio Container */}
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <div className="absolute inset-0">
              <UnityGame />
            </div>
          </div>

          {/* Controls Overlay */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg p-2 border border-border/50">
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Unity WebGL</span>
          </div>
        </motion.div>

        {/* Physics and Reviews Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Physics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowPhysics(!showPhysics)}
                className="w-full px-6 py-4 flex items-center justify-between bg-background/50 hover:bg-background/70 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Fizik Açıklaması</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    showPhysics ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showPhysics && (
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-background/50 rounded-lg p-4">
                      <p className="text-sm font-medium text-primary mb-2">
                        Hooke Yasası:
                      </p>
                      <p className="text-muted-foreground">F = -kx</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <p className="text-sm font-medium text-primary mb-2">
                        Periyot Formülü:
                      </p>
                      <p className="text-muted-foreground">T = 2π√(m/k)</p>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">
                        Öğrenme Hedefleri
                      </h3>
                      <ul className="space-y-2">
                        {learningObjectives.map((objective, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="w-full px-6 py-4 flex items-center justify-between bg-background/50 hover:bg-background/70 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Değerlendirmeler</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    showReviews ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showReviews && (
                <div className="p-6">
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        className="bg-background/50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary font-medium">
                                {review.user[0]}
                              </span>
                            </div>
                            <span className="font-medium">{review.user}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {review.comment}
                        </p>
                        <span className="text-xs text-muted-foreground mt-2 block">
                          {review.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-background rounded-xl p-6 shadow-lg border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setShowInfo(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-bold mb-4">Simülasyon Hakkında</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  Bu interaktif fizik simülasyonu, öğrencilerin fizik
                  prensiplerini görsel ve pratik bir şekilde öğrenmelerini
                  sağlar. Gerçek dünya senaryolarını yansıtan deneyler
                  yapabilir, sonuçları analiz edebilir ve fizik prensiplerini
                  daha iyi anlayabilirsiniz.
                </p>
                <h3 className="text-xl font-semibold mb-2">
                  Öğrenme Hedefleri
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Fizik prensiplerini görsel olarak anlama</li>
                  <li>Deney tasarımı ve veri analizi becerileri</li>
                  <li>Bilimsel düşünme ve problem çözme yetenekleri</li>
                </ul>
                <h3 className="text-xl font-semibold mt-6 mb-2">Kontroller</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    <span>
                      Simülasyonu başlatmak için Play butonuna tıklayın
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      Deney parametrelerini ayarlayın ve sonuçları gözlemleyin
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snapshots Modal */}
      <AnimatePresence>
        {showSnapshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSnapshots(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-background rounded-xl p-6 shadow-lg border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setShowSnapshots(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-bold mb-4">Nasıl Kullanılır</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image
                  src={snapshots[currentSnapshot].image}
                  alt={snapshots[currentSnapshot].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-medium text-lg">
                    {snapshots[currentSnapshot].title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {snapshots[currentSnapshot].description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                  onClick={prevSnapshot}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                  onClick={nextSnapshot}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex justify-center gap-2">
                {snapshots.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSnapshot
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                    onClick={() => setCurrentSnapshot(index)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
