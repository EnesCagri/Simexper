"use client";

import UnityGame from "@/components/UnityGame";
import { motion, AnimatePresence } from "framer-motion";
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
  PlayCircle,
  FileText,
  Video,
  Presentation,
  Check,
  X,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { getSimulationBySlug } from "@/db/utils";
import {
  SimulationData,
  ExamQuestion,
  EducationalMaterial,
  ExampleQuestion,
  RelatedMaterials,
  BlogPostData,
} from "@/db/types";

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface BlogPost {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  link: string;
}

interface LectureMaterial {
  title: string;
  type: "pdf" | "video" | "presentation";
  description: string;
  link: string;
}

interface ExamStatistics {
  totalQuestions: number;
  lastAskedYear: string;
  frequencyPercentage: number; // Chance of appearing in exam
  averageDifficulty: number; // 1-5 scale
}

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Simulation {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  completionTime: string;
  points: number;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  gradient: string;
  physicsExplanation: {
    formulas: string[];
    concepts: string[];
  };
  learningObjectives: string[];
  reviews: Review[];
  howItWorksVideo?: string;
  blogPosts: BlogPost[];
  lectureMaterials: LectureMaterial[];
  detailedDescription: string;
  examQuestions: ExamQuestion[];
  examStats: ExamStatistics;
  educationalMaterials?: EducationalMaterial[];
}

const categoryIcons: Record<string, any> = {
  mekanik: Brain,
  elektromanyetizma: Target,
  optik: Eye,
  termodinamik: Flame,
  "modern-fizik": Zap,
  genel: BookOpen,
};

const categoryColors: Record<string, string> = {
  mekanik: "from-blue-500 to-cyan-500",
  elektromanyetizma: "from-purple-500 to-pink-500",
  optik: "from-green-500 to-emerald-500",
  termodinamik: "from-yellow-500 to-amber-500",
  "modern-fizik": "from-red-500 to-orange-500",
  genel: "from-gray-500 to-slate-500",
};

export default function SimulationPage() {
  const params = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPhysicsExplanation, setShowPhysicsExplanation] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<ExampleQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedExamQuestion, setSelectedExamQuestion] =
    useState<ExamQuestion | null>(null);

  const slug = params.slug as string;
  const simulation = getSimulationBySlug(slug);
  const Icon = simulation
    ? categoryIcons[simulation.category] || BookOpen
    : BookOpen;

  // Get related materials
  const relatedMaterials = simulation?.relatedMaterials || {
    blogPosts: [],
    examQuestions: [],
    examStats: {
      totalQuestions: 0,
      lastAskedYear: "",
      frequencyPercentage: 0,
      averageDifficulty: 0,
    },
  };

  // Update exam questions section
  const examQuestions = relatedMaterials.examQuestions || [];
  const examStats = relatedMaterials.examStats;

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

  const generateQuestion = () => {
    if (!simulation) return;

    // Question bank for each simulation based on slug
    const questionBanks: Record<string, ExampleQuestion[]> = {
      "kaldirma-kuvveti": [
        {
          question: "Yoğunluğu 800 kg/m³ olan bir cisim, yoğunluğu 1000 kg/m³ olan suya bırakılıyor. Cismin durumu nasıl olur?",
          type: "multiple-choice",
          options: [
            "Cisim yüzer",
            "Cisim batar",
            "Cisim askıda kalır",
            "Cismin durumu kütlesine bağlıdır",
            "Cismin durumu hacmine bağlıdır",
          ],
          correctAnswer: 0,
          explanation: "Cismin yoğunluğu (800 kg/m³) suyun yoğunluğundan (1000 kg/m³) küçük olduğu için cisim yüzer. Archimedes prensibine göre, cismin yoğunluğu sıvının yoğunluğundan küçükse cisim yüzer.",
        },
        {
          question: "Bir cismin kaldırma kuvveti hangi faktörlere bağlıdır?",
          type: "multiple-choice",
          options: [
            "Sadece cismin kütlesine",
            "Sadece sıvının yoğunluğuna",
            "Sıvının yoğunluğu, cismin batan hacmi ve yerçekimi ivmesi",
            "Sadece cismin hacmine",
            "Sadece sıvının sıcaklığına",
          ],
          correctAnswer: 2,
          explanation: "Kaldırma kuvveti F = ρgV formülü ile hesaplanır. Burada ρ sıvının yoğunluğu, g yerçekimi ivmesi, V ise cismin batan hacmidir.",
        },
        {
          question: "Archimedes prensibine göre, bir cismin kaldırma kuvveti neye eşittir?",
          type: "multiple-choice",
          options: [
            "Cismin ağırlığına",
            "Cismin yer değiştirdiği sıvının ağırlığına",
            "Cismin kütlesine",
            "Sıvının basıncına",
            "Cismin hacmine",
          ],
          correctAnswer: 1,
          explanation: "Archimedes prensibine göre, bir cisme etki eden kaldırma kuvveti, cismin yer değiştirdiği sıvının ağırlığına eşittir.",
        },
      ],
      "yenilenebilir-enerji": [
        {
          question: "Aşağıdakilerden hangisi yenilenebilir enerji kaynağı değildir?",
          type: "multiple-choice",
          options: [
            "Güneş enerjisi",
            "Rüzgar enerjisi",
            "Kömür",
            "Hidroelektrik enerji",
            "Jeotermal enerji",
          ],
          correctAnswer: 2,
          explanation: "Kömür fosil yakıttır ve yenilenebilir değildir. Güneş, rüzgar, hidroelektrik ve jeotermal enerji yenilenebilir enerji kaynaklarıdır.",
        },
        {
          question: "Güneş panellerinin çalışma prensibi nedir?",
          type: "multiple-choice",
          options: [
            "Fotoelektrik etki",
            "Termodinamik döngü",
            "Manyetik indüksiyon",
            "Kimyasal reaksiyon",
            "Nükleer fisyon",
          ],
          correctAnswer: 0,
          explanation: "Güneş panelleri fotovoltaik hücreler kullanarak güneş ışığını doğrudan elektrik enerjisine dönüştürür. Bu işlem fotoelektrik etki prensibine dayanır.",
        },
      ],
      "yercekimi": [
        {
          question: "Yerçekimi kuvveti hangi faktörlere bağlıdır?",
          type: "multiple-choice",
          options: [
            "Sadece kütleye",
            "Sadece mesafeye",
            "Kütleye ve mesafenin karesine",
            "Sadece hıza",
            "Sadece ivmeye",
          ],
          correctAnswer: 2,
          explanation: "Yerçekimi kuvveti F = G(m₁m₂)/r² formülü ile hesaplanır. Burada G evrensel çekim sabiti, m₁ ve m₂ kütleler, r ise mesafedir. Kuvvet kütlelerle doğru, mesafenin karesiyle ters orantılıdır.",
        },
        {
          question: "Dünya yüzeyinde yerçekimi ivmesi yaklaşık olarak kaç m/s²'dir?",
          type: "multiple-choice",
          options: ["9.8", "10", "8.9", "11.2", "7.5"],
          correctAnswer: 0,
          explanation: "Dünya yüzeyinde yerçekimi ivmesi yaklaşık 9.8 m/s²'dir. Bu değer deniz seviyesinde ve ekvatorda biraz farklılık gösterebilir.",
        },
      ],
      "golge-ve-aydinlanma": [
        {
          question: "Gölge oluşumu hangi optik prensibe dayanır?",
          type: "multiple-choice",
          options: [
            "Işığın doğrusal yayılması",
            "Işığın kırılması",
            "Işığın yansıması",
            "Işığın girişimi",
            "Işığın kırınımı",
          ],
          correctAnswer: 0,
          explanation: "Gölge oluşumu, ışığın doğrusal yayılması prensibine dayanır. Işık kaynağından çıkan ışınlar doğrusal olarak yayılır ve opak cisimler tarafından engellenerek gölge oluşturur.",
        },
        {
          question: "Aydınlanma şiddeti hangi faktörlere bağlıdır?",
          type: "multiple-choice",
          options: [
            "Sadece ışık kaynağının gücüne",
            "Işık kaynağının gücü ve mesafenin karesine",
            "Sadece mesafeye",
            "Sadece açıya",
            "Sadece ortamın sıcaklığına",
          ],
          correctAnswer: 1,
          explanation: "Aydınlanma şiddeti E = I/r² formülü ile hesaplanır. Burada I ışık kaynağının şiddeti, r ise mesafedir. Aydınlanma, ışık kaynağının şiddetiyle doğru, mesafenin karesiyle ters orantılıdır.",
        },
      ],
      "hava-direnci": [
        {
          question: "Hava direnci kuvveti hangi faktörlere bağlıdır?",
          type: "multiple-choice",
          options: [
            "Sadece hıza",
            "Sadece cismin şekline",
            "Hızın karesi, hava yoğunluğu, cismin kesit alanı ve sürükleme katsayısı",
            "Sadece cismin kütlesine",
            "Sadece sıcaklığa",
          ],
          correctAnswer: 2,
          explanation: "Hava direnci F = ½ρv²CdA formülü ile hesaplanır. Burada ρ hava yoğunluğu, v hız, Cd sürükleme katsayısı, A ise cismin kesit alanıdır.",
        },
      ],
      "isi-alisverisi": [
        {
          question: "Isı ve sıcaklık arasındaki fark nedir?",
          type: "multiple-choice",
          options: [
            "Isı enerji, sıcaklık ise ölçümdür",
            "Isı ve sıcaklık aynı şeydir",
            "Isı sıcaklıktan daha küçük bir birimdir",
            "Isı sadece katılarda, sıcaklık sadece sıvılarda ölçülür",
            "Isı ve sıcaklık arasında fark yoktur",
          ],
          correctAnswer: 0,
          explanation: "Isı bir enerji türüdür ve joule (J) ile ölçülür. Sıcaklık ise bir ölçümdür ve derece Celsius (°C) veya Kelvin (K) ile ölçülür. Isı, sıcaklık farkından dolayı transfer olan enerjidir.",
        },
        {
          question: "Isı transferi hangi yollarla gerçekleşir?",
          type: "multiple-choice",
          options: [
            "Sadece iletim",
            "Sadece konveksiyon",
            "İletim, konveksiyon ve ışıma",
            "Sadece ışıma",
            "Sadece difüzyon",
          ],
          correctAnswer: 2,
          explanation: "Isı transferi üç yolla gerçekleşir: iletim (katılarda), konveksiyon (sıvı ve gazlarda) ve ışıma (tüm ortamlarda, boşlukta bile).",
        },
      ],
      "laser-ve-ayna-yansimlari": [
        {
          question: "Yansıma yasasına göre, gelme açısı ve yansıma açısı arasındaki ilişki nedir?",
          type: "multiple-choice",
          options: [
            "Gelme açısı yansıma açısından büyüktür",
            "Gelme açısı yansıma açısından küçüktür",
            "Gelme açısı yansıma açısına eşittir",
            "Açılar arasında ilişki yoktur",
            "Açılar toplamı 90°'dir",
          ],
          correctAnswer: 2,
          explanation: "Yansıma yasasına göre, gelme açısı (θi) yansıma açısına (θr) eşittir: θi = θr. Bu yasa tüm yansımalar için geçerlidir.",
        },
        {
          question: "Laser ışığının özelliklerinden hangisi doğrudur?",
          type: "multiple-choice",
          options: [
            "Laser ışığı dağınıktır",
            "Laser ışığı tek renklidir ve tutarlıdır",
            "Laser ışığı çok geniş bir spektruma sahiptir",
            "Laser ışığı sadece görünür bölgededir",
            "Laser ışığı düşük yoğunlukludur",
          ],
          correctAnswer: 1,
          explanation: "Laser (Light Amplification by Stimulated Emission of Radiation) ışığı tek renkli (monokromatik), tutarlı (koherent) ve yönlendirilmiş (düşük dağılımlı) bir ışık demetidir.",
        },
      ],
      "ph-olcucu": [
        {
          question: "pH değeri 7'den küçük olan bir çözelti nasıl tanımlanır?",
          type: "multiple-choice",
          options: ["Bazik", "Asidik", "Nötr", "Tuzlu", "Alkali"],
          correctAnswer: 1,
          explanation: "pH değeri 0-14 arasında ölçülür. pH < 7 asidik, pH = 7 nötr, pH > 7 bazik (alkali) çözeltileri gösterir.",
        },
        {
          question: "pH = -log[H⁺] formülünde [H⁺] neyi temsil eder?",
          type: "multiple-choice",
          options: [
            "Hidroksit iyonu konsantrasyonu",
            "Hidrojen iyonu konsantrasyonu",
            "Su molekülü sayısı",
            "Asit molekülü sayısı",
            "Baz molekülü sayısı",
          ],
          correctAnswer: 1,
          explanation: "[H⁺] hidrojen iyonu (proton) konsantrasyonunu temsil eder. pH değeri, hidrojen iyonu konsantrasyonunun negatif logaritmasıdır.",
        },
      ],
      "ses-dalgalari": [
        {
          question: "Ses dalgalarının hızı hangi faktörlere bağlıdır?",
          type: "multiple-choice",
          options: [
            "Sadece frekansa",
            "Sadece genliğe",
            "Ortamın sıcaklığına ve özelliklerine",
            "Sadece dalga boyuna",
            "Sadece kaynağın gücüne",
          ],
          correctAnswer: 2,
          explanation: "Ses hızı ortamın özelliklerine (yoğunluk, elastiklik modülü) ve sıcaklığına bağlıdır. Havada yaklaşık 343 m/s, suda 1500 m/s, çelikte 5000 m/s'dir.",
        },
        {
          question: "Ses dalgasının frekansı ile dalga boyu arasındaki ilişki nedir?",
          type: "multiple-choice",
          options: [
            "Frekans = Hız / Dalga boyu",
            "Dalga boyu = Hız × Frekans",
            "Frekans ve dalga boyu arasında ilişki yoktur",
            "Frekans = Dalga boyu / Hız",
            "Frekans = Hız × Dalga boyu",
          ],
          correctAnswer: 0,
          explanation: "Ses dalgası için v = fλ formülü geçerlidir. Burada v hız, f frekans, λ dalga boyudur. Dolayısıyla f = v/λ'dır.",
        },
      ],
      "tork-tahteravalli": [
        {
          question: "Tork (moment) hangi faktörlere bağlıdır?",
          type: "multiple-choice",
          options: [
            "Sadece kuvvete",
            "Sadece mesafeye",
            "Kuvvet ve kuvvet kolu (mesafe)",
            "Sadece açıya",
            "Sadece kütleye",
          ],
          correctAnswer: 2,
          explanation: "Tork τ = r × F formülü ile hesaplanır. Burada r kuvvet kolu (mesafe), F ise kuvvettir. Tork, kuvvet ve kuvvet kolunun çarpımına eşittir.",
        },
        {
          question: "Bir tahteravallinin dengede olması için gerekli koşul nedir?",
          type: "multiple-choice",
          options: [
            "Her iki taraftaki kütleler eşit olmalıdır",
            "Her iki taraftaki kuvvetler eşit olmalıdır",
            "Her iki taraftaki torklar eşit olmalıdır (Στ = 0)",
            "Her iki taraftaki hızlar eşit olmalıdır",
            "Her iki taraftaki enerjiler eşit olmalıdır",
          ],
          correctAnswer: 2,
          explanation: "Denge koşulu için toplam tork sıfır olmalıdır: Στ = 0. Bu, her iki taraftaki torkların eşit olması anlamına gelir. Kütleler eşit olmasa bile, mesafeler ayarlanarak denge sağlanabilir.",
        },
      ],
      "elementler": [
        {
          question: "Periyodik tabloda elementler nasıl sıralanmıştır?",
          type: "multiple-choice",
          options: [
            "Sadece kütle numarasına göre",
            "Atom numarasına (proton sayısına) göre",
            "Sadece elektron sayısına göre",
            "Sadece izotop sayısına göre",
            "Alfabetik sıraya göre",
          ],
          correctAnswer: 1,
          explanation: "Periyodik tabloda elementler atom numarasına (proton sayısına) göre artan sırada dizilmiştir. Modern periyodik yasa, elementlerin özelliklerinin atom numaralarına periyodik olarak bağlı olduğunu söyler.",
        },
        {
          question: "Aynı periyotta (yatay sırada) soldan sağa gidildikçe atom yarıçapı nasıl değişir?",
          type: "multiple-choice",
          options: [
            "Artar",
            "Azalır",
            "Değişmez",
            "Önce artar sonra azalır",
            "Rastgele değişir",
          ],
          correctAnswer: 1,
          explanation: "Aynı periyotta soldan sağa gidildikçe atom numarası artar, çekirdek yükü artar ve elektronlar daha güçlü çekilir. Bu nedenle atom yarıçapı azalır.",
        },
      ],
    };

    // Get questions for this simulation or use default
    const questions = questionBanks[simulation.slug] || [
      {
        question: `${simulation.title} simülasyonu ile ilgili temel kavramları anladınız mı?`,
        type: "multiple-choice" as const,
        options: [
          "Evet, tüm kavramları anladım",
          "Kısmen anladım",
          "Hayır, daha fazla pratik yapmam gerekiyor",
          "Simülasyonu henüz tamamlamadım",
        ],
        correctAnswer: 0,
        explanation: `${simulation.title} simülasyonu ile ilgili kavramları daha iyi anlamak için simülasyonu tekrar deneyebilir ve ilgili materyalleri inceleyebilirsiniz.`,
      },
    ];

    // Randomly select a question from the bank
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];

    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowQuestionModal(true);
  };

  const checkAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    setIsCorrect(selectedIndex === currentQuestion?.correctAnswer);
    setShowFeedback(true);
  };

  const openQuestionModal = (question: ExamQuestion) => {
    setSelectedExamQuestion(question);
  };

  if (!simulation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simülasyon Bulunamadı
          </h1>
          <p className="text-gray-400 mb-8">
            İstediğiniz simülasyon mevcut değil.
          </p>
          <Link href="/simulations">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Simülasyonlara Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gray-950 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_50%)]" />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/30 backdrop-blur-sm border-b border-gray-800/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/simulations">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPhysicsExplanation(true)}
              >
                <BookOpen className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReviews(true)}
              >
                <Users className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="relative container mx-auto px-4 pt-24 pb-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Column - Unity Game and Questions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title and Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50 mb-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${
                      categoryColors[simulation.category]
                    } bg-opacity-10 backdrop-blur-sm ring-1 ring-white/10`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                      {simulation.title}
                    </h1>
                    <p className="text-gray-400 text-lg">
                      {simulation.description}
                    </p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-gray-900/50 border-gray-800/50 hover:bg-gray-800/30 flex items-center gap-2"
                    >
                      <PlayCircle className="w-6 h-6 text-green-400" />
                      <span className="text-gray-300 font-medium">
                        Nasıl Çalışır?
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] bg-gray-900/95 border-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-white mb-4">
                        {simulation.title} - Nasıl Çalışır?
                      </DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video w-full">
                      <iframe
                        src={simulation.howItWorksVideo}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
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
            </motion.div>

            {/* Simulation Container */}
            <motion.div
              id="simulation-container"
              data-simulation-slug={slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm mb-12 w-full"
              style={{
                aspectRatio: "16/9",
                maxHeight: "calc(100vh - 200px)",
                minHeight: "600px",
              }}
            >
              <UnityGame />
            </motion.div>

            {/* Detailed Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Detaylı Açıklama
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-line">
                  {simulation.detailedDescription}
                </p>
              </div>
            </motion.div>

            {/* Exam Questions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  Çıkmış Sorular
                </h2>
                <Button
                  onClick={generateQuestion}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  Soru Üret
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {examQuestions.map((question: ExamQuestion, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50 hover:border-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-gray-900/50">
                            {question.examType} {question.year}
                          </Badge>
                        </div>
                        <p className="text-gray-300">{question.question}</p>
                        {question.image && (
                          <div className="mt-2">
                            <Image
                              src={question.image}
                              alt="Soru görseli"
                              width={300}
                              height={200}
                              className="rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Question Modal */}
            <Dialog
              open={showQuestionModal}
              onOpenChange={setShowQuestionModal}
            >
              <DialogContent className="sm:max-w-[600px] bg-gray-900/95 border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white mb-4">
                    Pratik Sorusu
                  </DialogTitle>
                </DialogHeader>

                {currentQuestion && (
                  <div className="space-y-6">
                    <p className="text-lg text-gray-200">
                      {currentQuestion.question}
                    </p>

                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => checkAnswer(index)}
                          disabled={showFeedback}
                          className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                            selectedAnswer === index
                              ? showFeedback
                                ? isCorrect
                                  ? "bg-green-500/20 border-green-500"
                                  : "bg-red-500/20 border-red-500"
                                : "bg-blue-500/20 border-blue-500"
                              : "bg-gray-800/50 hover:bg-gray-800 border-gray-700"
                          } border`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-200">{option}</span>
                            {showFeedback && selectedAnswer === index && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.5 }}
                              >
                                {isCorrect ? (
                                  <Check className="w-6 h-6 text-green-500" />
                                ) : (
                                  <X className="w-6 h-6 text-red-500" />
                                )}
                              </motion.div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {showFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 rounded-lg ${
                            isCorrect ? "bg-green-500/20" : "bg-red-500/20"
                          }`}
                        >
                          <p
                            className={`text-lg font-medium ${
                              isCorrect ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {isCorrect ? "Doğru Cevap! 🎉" : "Yanlış Cevap"}
                          </p>
                          <p className="text-gray-300 mt-2">
                            {currentQuestion.explanation}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowQuestionModal(false)}
                    className="border-gray-700"
                  >
                    Kapat
                  </Button>
                  {showFeedback && (
                    <Button
                      onClick={generateQuestion}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    >
                      Yeni Soru
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Exam Question Modal */}
            <Dialog
              open={!!selectedExamQuestion}
              onOpenChange={() => setSelectedExamQuestion(null)}
            >
              <DialogContent className="sm:max-w-[700px] bg-gray-900/95 border-gray-800">
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    {selectedExamQuestion && (
                      <>
                        <Badge
                          variant="outline"
                          className="bg-blue-500/10 text-blue-400 border-blue-500/20"
                        >
                          {selectedExamQuestion.examType}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-purple-500/10 text-purple-400 border-purple-500/20"
                        >
                          {selectedExamQuestion.year}
                        </Badge>
                      </>
                    )}
                  </div>
                </DialogHeader>

                {selectedExamQuestion && (
                  <div className="space-y-6">
                    {selectedExamQuestion.image && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={selectedExamQuestion.image}
                          alt="Soru görseli"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <p className="text-lg text-gray-200">
                        {selectedExamQuestion.question}
                      </p>

                      <div className="flex flex-col gap-4">
                        <Button
                          variant="outline"
                          size="lg"
                          className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20 justify-start"
                          onClick={() => {}}
                        >
                          <span className="text-left">
                            {selectedExamQuestion.correctAnswer}
                          </span>
                        </Button>

                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <h3 className="text-lg font-medium text-blue-400 mb-2">
                            Çözüm
                          </h3>
                          <p className="text-gray-300">
                            {selectedExamQuestion.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedExamQuestion(null)}
                    className="border-gray-700"
                  >
                    Kapat
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right Column - Learning Objectives and Additional Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Learning Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gray-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Kazanımlar</h2>
              <ul className="space-y-3">
                {simulation.learningObjectives.map((objective, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg text-gray-300"
                  >
                    <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Blog Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gray-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                İlgili Blog Yazıları
              </h2>
              <div className="space-y-4">
                {relatedMaterials.blogPosts.map((post, index) => (
                  <Link
                    key={index}
                    href={`/blogs/${post.slug}`}
                    className="block bg-gray-900/30 rounded-xl p-4 border border-gray-800/50 hover:border-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{post.excerpt}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{post.author.name}</span>
                          <span>{post.date}</span>
                          <span>{post.readingTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gray-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Değerlendirmeler
              </h2>
              <div className="space-y-4">
                {simulation.reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-800/30 rounded-xl">
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
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-1/4 right-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-8 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
    </div>
  );
}
