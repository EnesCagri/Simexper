"use client";

import UnityGame from "@/components/UnityGame";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Maximize2,
  Brain,
  Zap,
  Lightbulb,
  Flame,
  Clock,
  Star,
  BookOpen,
  Users,
  ChevronDown,
  ChevronUp,
  Target,
  Circle,
  Move,
  Battery,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Simulation {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  completionTime: string;
  points: number;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  physicsExplanation: {
    formulas: string[];
    concepts: string[];
  };
  learningObjectives: string[];
  reviews: Review[];
}

const simulationData: Record<string, Simulation> = {
  "harmonic-motion": {
    title: "Basit Harmonik Hareket",
    description: "Yay sistemlerinin harmonik hareketini inceleyin",
    category: "mekanik",
    difficulty: "Orta",
    completionTime: "20 dk",
    points: 100,
    icon: Brain,
    physicsExplanation: {
      formulas: ["Hooke Yasası: F = -kx", "Periyot Formülü: T = 2π√(m/k)"],
      concepts: [
        "Basit harmonik hareket",
        "Yay sabiti (k)",
        "Kütle (m)",
        "Genlik (A)",
        "Periyot (T)",
        "Frekans (f)",
      ],
    },
    learningObjectives: [
      "Hooke yasasını anlama",
      "Periyot ve frekans kavramlarını öğrenme",
      "Enerji dönüşümlerini gözlemleme",
      "Genlik ve periyot arasındaki ilişkiyi keşfetme",
    ],
    reviews: [
      {
        user: "Ahmet Y.",
        rating: 5,
        comment:
          "Çok etkileyici bir simülasyon. Yayın hareketini çok iyi anladım.",
        date: "2024-03-15",
      },
      {
        user: "Ayşe K.",
        rating: 4,
        comment:
          "Görsel olarak çok iyi, ancak biraz daha detaylı açıklama eklenebilir.",
        date: "2024-03-10",
      },
    ],
  },
  "projectile-motion": {
    title: "Eğik Atış Hareketi",
    description: "Eğik atış hareketini inceleyin",
    category: "mekanik",
    difficulty: "Orta",
    completionTime: "25 dk",
    points: 120,
    icon: Target,
    physicsExplanation: {
      formulas: ["x = v₀cosθt", "y = v₀sinθt - ½gt²"],
      concepts: [
        "Yatay ve dikey hareket bağımsızdır",
        "Maksimum yükseklik ve menzil hesaplamaları",
      ],
    },
    learningObjectives: [
      "Eğik atış hareketini analiz etme",
      "Yatay ve düşey hareketleri ayırt etme",
      "Menzil ve yükseklik hesaplamalarını öğrenme",
      "Hava direncinin etkisini gözlemleme",
    ],
    reviews: [
      {
        user: "Mehmet S.",
        rating: 5,
        comment: "Harika bir simülasyon, eğik atışı çok iyi anladım.",
        date: "2024-03-12",
      },
    ],
  },
  collisions: {
    title: "Çarpışmalar",
    description: "Elastik ve esnek çarpışmaları keşfedin",
    category: "mekanik",
    difficulty: "İleri",
    completionTime: "45 dk",
    points: 120,
    icon: Brain,
    physicsExplanation: {
      formulas: [],
      concepts: [],
    },
    learningObjectives: [],
    reviews: [],
  },
  "electric-field": {
    title: "Elektrik Alan Çizgileri",
    description: "Elektrik yüklerinin oluşturduğu alanları keşfedin",
    category: "elektromanyetizma",
    difficulty: "İleri",
    completionTime: "30 dk",
    points: 90,
    icon: Zap,
    physicsExplanation: {
      formulas: [],
      concepts: [],
    },
    learningObjectives: [],
    reviews: [],
  },
  "magnetic-induction": {
    title: "Manyetik İndüksiyon",
    description: "Manyetik alan ve indüksiyon akımlarını inceleyin",
    category: "elektromanyetizma",
    difficulty: "İleri",
    completionTime: "40 dk",
    points: 110,
    icon: Zap,
    physicsExplanation: {
      formulas: [],
      concepts: [],
    },
    learningObjectives: [],
    reviews: [],
  },
  lenses: {
    title: "Mercek Sistemleri",
    description: "Işığın merceklerdeki davranışını gözlemleyin",
    category: "optik",
    difficulty: "Orta",
    completionTime: "25 dk",
    points: 70,
    icon: Lightbulb,
    physicsExplanation: {
      formulas: [],
      concepts: [],
    },
    learningObjectives: [],
    reviews: [],
  },
  "heat-transfer": {
    title: "Isı Transferi",
    description: "Farklı ısı transfer mekanizmalarını inceleyin",
    category: "termodinamik",
    difficulty: "Orta",
    completionTime: "30 dk",
    points: 80,
    icon: Flame,
    physicsExplanation: {
      formulas: [],
      concepts: [],
    },
    learningObjectives: [],
    reviews: [],
  },
  "circular-motion": {
    title: "Dairesel Hareket",
    description: "Dairesel hareketi inceleyin",
    category: "mekanik",
    difficulty: "Zor",
    completionTime: "30 dk",
    points: 150,
    icon: Circle,
    physicsExplanation: {
      formulas: ["F = mv²/r", "a = v²/r"],
      concepts: ["Merkezcil kuvvet", "Açısal hız", "Periyot ve frekans"],
    },
    learningObjectives: [
      "Dairesel hareketin temel özelliklerini anlama",
      "Merkezcil kuvvet kavramını öğrenme",
      "Açısal hız ve çizgisel hız ilişkisini kavrama",
      "Dönme hareketlerini analiz etme",
    ],
    reviews: [
      {
        user: "Ayşe K.",
        rating: 5,
        comment:
          "Karmaşık konuları çok iyi açıklayan bir simülasyon. Görselleştirmeler çok yardımcı oldu.",
        date: "2024-03-08",
      },
    ],
  },
  "newtons-laws": {
    title: "Newton'un Hareket Yasaları",
    description: "Newton'un hareket yasalarını keşfedin",
    category: "mekanik",
    difficulty: "Kolay",
    completionTime: "15 dk",
    points: 80,
    icon: Zap,
    physicsExplanation: {
      formulas: ["F = ma", "F₁₂ = -F₂₁"],
      concepts: [
        "Eylemsizlik",
        "Kuvvet ve ivme ilişkisi",
        "Etki-tepki prensibi",
      ],
    },
    learningObjectives: [
      "Newton'un üç hareket yasasını anlama",
      "Kuvvet ve ivme ilişkisini kavrama",
      "Etki-tepki prensibini öğrenme",
      "Günlük hayattaki örnekleri analiz etme",
    ],
    reviews: [
      {
        user: "Mehmet S.",
        rating: 4,
        comment:
          "Temel fizik prensiplerini öğrenmek için mükemmel bir başlangıç.",
        date: "2024-03-05",
      },
    ],
  },
  momentum: {
    title: "Momentum ve Çarpışmalar",
    description: "Momentum ve çarpışmaları inceleyin",
    category: "mekanik",
    difficulty: "Orta",
    completionTime: "25 dk",
    points: 120,
    icon: Move,
    physicsExplanation: {
      formulas: ["p = mv", "Σp_başlangıç = Σp_son"],
      concepts: [
        "Momentum korunumu",
        "Esnek ve esnek olmayan çarpışmalar",
        "İtme",
      ],
    },
    learningObjectives: [
      "Momentum kavramını anlama",
      "Momentum korunumunu öğrenme",
      "Farklı çarpışma türlerini analiz etme",
      "İtme ve momentum ilişkisini kavrama",
    ],
    reviews: [
      {
        user: "Zeynep A.",
        rating: 4.5,
        comment:
          "Çarpışmaları görselleştirmek ve analiz etmek çok eğlenceliydi.",
        date: "2024-03-01",
      },
    ],
  },
  energy: {
    title: "Enerji ve İş",
    description: "Enerji dönüşümlerini keşfedin",
    category: "mekanik",
    difficulty: "Orta",
    completionTime: "20 dk",
    points: 100,
    icon: Battery,
    physicsExplanation: {
      formulas: ["K = ½mv²", "U = mgh", "E_toplam = K + U"],
      concepts: [
        "Enerji korunumu",
        "Kinetik ve potansiyel enerji dönüşümleri",
        "Sürtünme etkisi",
      ],
    },
    learningObjectives: [
      "Enerji türlerini tanıma",
      "Enerji dönüşümlerini anlama",
      "İş ve enerji ilişkisini kavrama",
      "Enerji korunumunu öğrenme",
    ],
    reviews: [
      {
        user: "Can B.",
        rating: 4,
        comment: "Enerji dönüşümlerini görmek ve hesaplamak çok öğreticiydi.",
        date: "2024-02-28",
      },
    ],
  },
};

const categoryColors = {
  mekanik: "from-blue-500 to-cyan-500",
  elektrik: "from-purple-500 to-pink-500",
  manyetizma: "from-red-500 to-orange-500",
  optik: "from-green-500 to-emerald-500",
  termodinamik: "from-yellow-500 to-amber-500",
};

export default function SimulationPage() {
  const params = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPhysicsExplanation, setShowPhysicsExplanation] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const simulationId = params.id as string;
  const simulation =
    simulationData[simulationId as keyof typeof simulationData];
  const Icon = simulation?.icon;

  useEffect(() => {
    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!simulation) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Simülasyon Bulunamadı
          </h1>
          <Button variant="outline" asChild>
            <Link href="/simulations">Simülasyonlara Dön</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link
                href="/simulations"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Simülasyonlara Dön
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="flex items-center gap-2 bg-gray-900/50 hover:bg-gray-800/50 border-gray-700"
            >
              <Maximize2 className="h-4 w-4" />
              {isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran"}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.15),transparent_50%)]" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center gap-6 bg-gray-900/30 p-6 rounded-2xl backdrop-blur-sm border border-gray-800/50">
            <div
              className={`p-3 rounded-2xl bg-gradient-to-br ${
                categoryColors[
                  simulation.category as keyof typeof categoryColors
                ]
              } bg-opacity-10 backdrop-blur-sm ring-1 ring-white/10`}
            >
              <Icon className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                {simulation.title}
              </h1>
              <p className="text-gray-400 text-lg">{simulation.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gray-900/30 p-4 rounded-xl backdrop-blur-sm border border-gray-800/50">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300 font-medium">
                {simulation.completionTime}
              </span>
            </div>
            <div className="flex items-center gap-3 bg-gray-900/30 p-4 rounded-xl backdrop-blur-sm border border-gray-800/50">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">
                {simulation.points} Puan
              </span>
            </div>
            <div className="flex items-center gap-3 bg-gray-900/30 p-4 rounded-xl backdrop-blur-sm border border-gray-800/50">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300 font-medium">
                {simulation.difficulty}
              </span>
            </div>
          </div>
          {!isCompleted && (
            <div className="mt-4 bg-gray-900/30 p-4 rounded-xl backdrop-blur-sm border border-gray-800/50">
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Game Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm mb-8"
          style={{ height: "75vh", minHeight: "700px" }}
        >
          <UnityGame />
        </motion.div>

        {/* Info Sections Container */}
        <div className="grid grid-cols-2 gap-8">
          {/* Physics Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-4 bg-gray-900/30 rounded-xl backdrop-blur-sm border border-gray-800/50 hover:bg-gray-800/30 transition-colors"
              onClick={() => setShowPhysicsExplanation(!showPhysicsExplanation)}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Fizik Açıklaması</span>
              </div>
              {showPhysicsExplanation ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
            {showPhysicsExplanation && (
              <div className="mt-4 p-6 bg-gray-900/30 rounded-xl backdrop-blur-sm border border-gray-800/50">
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-300 bg-gray-800/50 p-4 rounded-lg font-mono text-sm">
                    {simulation.physicsExplanation.formulas.join("\n")}
                  </pre>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Öğrenme Hedefleri
                  </h3>
                  <ul className="space-y-3">
                    {simulation.physicsExplanation.concepts.map(
                      (concept, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg text-gray-300"
                        >
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                          {concept}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-4 bg-gray-900/30 rounded-xl backdrop-blur-sm border border-gray-800/50 hover:bg-gray-800/30 transition-colors"
              onClick={() => setShowReviews(!showReviews)}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Değerlendirmeler</span>
              </div>
              {showReviews ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
            {showReviews && (
              <div className="mt-4 space-y-4">
                {simulation.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-900/30 rounded-xl backdrop-blur-sm border border-gray-800/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <span className="text-white font-medium block">
                            {review.user}
                          </span>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-gray-300 bg-gray-800/30 p-4 rounded-lg">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-1/4 right-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-8 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
    </div>
  );
}
