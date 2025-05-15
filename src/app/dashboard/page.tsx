"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  BookOpen,
  BarChart2,
  PlayCircle,
  MessageCircle,
  Users,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight,
  Award,
  Zap,
  Loader2,
} from "lucide-react";

const user = {
  name: "Alex Ryan",
  username: "alex.gg",
  avatar: "/images/avatar.png",
  class: "11. Sınıf",
  streak: 7,
  badges: 3,
};

const featured = [
  {
    id: 1,
    title: "Kuantum Tünelleme Simülasyonu",
    description: "Kuantum mekaniğinin en ilginç olaylarından birini keşfet.",
    image: "/images/simulation/Resim5.jpg",
    status: "in-progress",
    cta: "Devam Et",
  },
  {
    id: 2,
    title: "Elektrik Devreleri Quiz",
    description: "Seri ve paralel devreler hakkında bilginizi test edin.",
    image: "/images/simulation/Resim4.jpg",
    status: "waiting",
    cta: "Başla",
  },
  {
    id: 3,
    title: "Basit Harmonik Hareket",
    description: "Yay sistemlerinin harmonik hareketini deneyimle.",
    image: "/images/simulation/Resim1.png",
    status: "completed",
    cta: "Tekrarla",
  },
];

const progress = {
  classScore: 87,
  completed: 12,
  inProgress: 3,
  waiting: 2,
};

const quizCategories = [
  "Mekanik",
  "Elektrik",
  "Optik",
  "Termodinamik",
  "Modern Fizik",
];

const weakFields = [
  { field: "Elektrik", reason: "Düşük quiz skoru" },
  { field: "Optik", reason: "Az tamamlanan simülasyon" },
];

const quizQuestions = [
  {
    q: "Bir cismin ivmesi nedir?",
    a: ["Hız değişimi", "Kuvvet", "Enerji", "Kütle"],
    correct: 0,
  },
  { q: "Ohm yasası nedir?", a: ["V=IR", "F=ma", "E=mc^2", "P=IV"], correct: 0 },
];

const finishedBlogs = [
  { title: "Fizikte Enerji Dönüşümleri", date: "2024-05-01" },
  { title: "Modern Fizikte Temel Kavramlar", date: "2024-04-20" },
];

const finishedMaterials = [
  { title: "Elektrik Devreleri Video", type: "video" },
  { title: "Termodinamik Makalesi", type: "article" },
];

const gradeProgress = [
  { grade: "9. Sınıf", percent: 100 },
  { grade: "10. Sınıf", percent: 80 },
  { grade: "11. Sınıf", percent: 60 },
  { grade: "12. Sınıf", percent: 20 },
];

export default function DashboardPage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedQuizCategory, setSelectedQuizCategory] = useState<
    string | null
  >(null);
  const currentFeatured = featured[carouselIndex];

  // Sidebar tab list
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BookOpen },
    { id: "quiz", label: "Quiz Generator", icon: BarChart2 },
    { id: "progress", label: "Progress", icon: Award },
    { id: "simulations", label: "Simulations", icon: PlayCircle },
    { id: "chatbot", label: "Chatbot", icon: MessageCircle },
    { id: "teacher", label: "Teacher", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#2d133b] via-[#3a1c5c] to-[#1a1a2e]">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen bg-[#2a153a]/80 backdrop-blur-lg border-r border-[#3a1c5c]/40 flex flex-col py-8 px-6">
        <div className="flex items-center gap-4 mb-10">
          <Image
            src={user.avatar}
            alt={user.name}
            width={48}
            height={48}
            className="rounded-full border-2 border-purple-500"
          />
          <div>
            <div className="font-bold text-lg text-white">{user.name}</div>
            <div className="text-xs text-purple-300">@{user.username}</div>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-2 text-purple-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-semibold ${
                selectedTab === tab.id
                  ? "bg-purple-700/30 text-white"
                  : "hover:bg-purple-700/20"
              }`}
            >
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
          <div className="flex-1" />
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-700/20 transition text-left w-full">
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </nav>
        {/* Online Players/Users (optional) */}
        <div className="mt-8">
          <div className="text-xs text-purple-300 mb-2">Online Users</div>
          <div className="flex flex-col gap-1 text-purple-200 text-sm">
            <span>Esther Howard</span>
            <span>Jacob Jones</span>
            <span>Cody Fisher</span>
            <span>Alez Rayhan</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-[#3a1c5c]/60 to-[#1a1a2e]/80 px-10 py-8">
        {/* Dashboard Tab */}
        {selectedTab === "dashboard" && (
          <>
            {/* Hero/Welcome */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                  Hoş geldin, {user.name}!
                </h1>
                <div className="text-purple-200 text-lg">
                  Bugün ne öğrenmek istersin?
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-purple-300">Sınıf</span>
                  <span className="text-lg font-bold text-white">
                    {user.class}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-purple-300">Streak</span>
                  <span className="text-lg font-bold text-yellow-400">
                    {user.streak} gün
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-purple-300">Rozet</span>
                  <span className="text-lg font-bold text-pink-400">
                    {user.badges}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured/Continue Learning Carousel */}
            <div className="relative bg-gradient-to-br from-purple-800/60 via-pink-700/40 to-blue-900/40 rounded-2xl shadow-xl p-8 flex items-center mb-10">
              {/* Left Arrow */}
              <button
                onClick={() =>
                  setCarouselIndex(
                    (prev) => (prev - 1 + featured.length) % featured.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-purple-700/60 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl z-10"
                aria-label="Önceki"
              >
                <ChevronLeft />
              </button>
              {/* Main Card */}
              <div className="flex-1 flex gap-8 items-center">
                <div className="relative w-[340px] h-[200px] rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                  <Image
                    src={currentFeatured.image}
                    alt={currentFeatured.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-yellow-400/90 text-xs font-bold px-3 py-1 rounded-full text-black shadow">
                    {currentFeatured.status === "completed"
                      ? "Tamamlandı"
                      : currentFeatured.status === "in-progress"
                      ? "Devam Ediyor"
                      : "Bekliyor"}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {currentFeatured.title}
                  </h2>
                  <p className="text-purple-100 mb-4">
                    {currentFeatured.description}
                  </p>
                  <Link
                    href="#"
                    className="inline-block px-6 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow transition"
                  >
                    {currentFeatured.cta}
                  </Link>
                </div>
              </div>
              {/* Right Arrow */}
              <button
                onClick={() =>
                  setCarouselIndex((prev) => (prev + 1) % featured.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-purple-700/60 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl z-10"
                aria-label="Sonraki"
              >
                <ChevronRight />
              </button>
            </div>

            {/* Progress & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {/* Personal Progress */}
              <div className="bg-[#2a153a]/80 rounded-2xl p-6 shadow-lg flex flex-col items-center">
                <BarChart2 className="w-8 h-8 text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-white mb-1">
                  {progress.classScore}%
                </div>
                <div className="text-purple-200 mb-2">Sınıf Başarı Puanı</div>
                <div className="flex gap-4 mt-2">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-green-400">
                      {progress.completed}
                    </span>
                    <span className="text-xs text-purple-300">Tamamlandı</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-yellow-400">
                      {progress.inProgress}
                    </span>
                    <span className="text-xs text-purple-300">Devam</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-pink-400">
                      {progress.waiting}
                    </span>
                    <span className="text-xs text-purple-300">Bekliyor</span>
                  </div>
                </div>
              </div>
              {/* Quiz Generator */}
              <div className="bg-[#2a153a]/80 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                <BarChart2 className="w-8 h-8 text-pink-400 mb-2" />
                <div className="text-xl font-bold text-white mb-1">
                  Quiz Generator
                </div>
                <div className="text-purple-200 mb-4 text-center">
                  Kendi quizini oluştur ve bilgini test et!
                </div>
                <Link
                  href="#"
                  className="px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow transition"
                >
                  Quiz Oluştur
                </Link>
              </div>
              {/* Chatbot/Teacher */}
              <div className="bg-[#2a153a]/80 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                <MessageCircle className="w-8 h-8 text-blue-400 mb-2" />
                <div className="text-xl font-bold text-white mb-1">
                  Chatbot & Öğretmen
                </div>
                <div className="text-purple-200 mb-4 text-center">
                  Sorularını anında sor, rehberlik al.
                </div>
                <Link
                  href="#"
                  className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition"
                >
                  Sohbet Et
                </Link>
              </div>
            </div>

            {/* Simulations Section */}
            <div className="bg-[#2a153a]/80 rounded-2xl p-8 shadow-lg mb-10">
              <h2 className="text-2xl font-bold text-white mb-6">
                Simülasyonlarım
              </h2>
              <div className="flex flex-wrap gap-6">
                {featured.map((sim, idx) => (
                  <div
                    key={sim.id}
                    className="w-64 bg-[#3a1c5c]/80 rounded-xl shadow flex flex-col overflow-hidden"
                  >
                    <div className="relative h-32 w-full">
                      <Image
                        src={sim.image}
                        alt={sim.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-yellow-400/90 text-xs font-bold px-2 py-0.5 rounded-full text-black shadow">
                        {sim.status === "completed"
                          ? "Tamamlandı"
                          : sim.status === "in-progress"
                          ? "Devam"
                          : "Bekliyor"}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="font-bold text-white mb-1 text-base line-clamp-1">
                        {sim.title}
                      </div>
                      <div className="text-purple-200 text-xs mb-2 line-clamp-2">
                        {sim.description}
                      </div>
                      <Link
                        href="#"
                        className="mt-auto text-blue-400 hover:underline text-sm font-semibold"
                      >
                        {sim.cta}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* You Might Also Like (Suggestions) */}
            <div className="bg-[#2a153a]/80 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6">
                Önerilenler
              </h2>
              <div className="flex flex-wrap gap-6">
                {featured.map((sim, idx) => (
                  <div
                    key={sim.id}
                    className="w-64 bg-[#3a1c5c]/80 rounded-xl shadow flex flex-col overflow-hidden"
                  >
                    <div className="relative h-32 w-full">
                      <Image
                        src={sim.image}
                        alt={sim.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-blue-400/90 text-xs font-bold px-2 py-0.5 rounded-full text-black shadow">
                        Öneri
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="font-bold text-white mb-1 text-base line-clamp-1">
                        {sim.title}
                      </div>
                      <div className="text-purple-200 text-xs mb-2 line-clamp-2">
                        {sim.description}
                      </div>
                      <Link
                        href="#"
                        className="mt-auto text-pink-400 hover:underline text-sm font-semibold"
                      >
                        İncele
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Quiz Generator Tab */}
        {selectedTab === "quiz" && (
          <div className="max-w-2xl mx-auto bg-[#2a153a]/80 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">
              Quiz Generator
            </h2>
            <div className="mb-6">
              <div className="text-purple-200 mb-2">Kategori Seç:</div>
              <div className="flex flex-wrap gap-3 mb-4">
                {quizCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedQuizCategory(cat);
                      setQuizModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-full bg-purple-700/30 text-white font-semibold hover:bg-pink-600 transition"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {/* Weak Points Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-pink-400 mb-2">
                Zayıf Alanlar
              </h3>
              <div className="flex flex-wrap gap-3">
                {weakFields.map((w) => (
                  <button
                    key={w.field}
                    onClick={() => {
                      setSelectedQuizCategory(w.field);
                      setQuizModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-full bg-pink-700/30 text-white font-semibold hover:bg-pink-600 transition"
                  >
                    {w.field}{" "}
                    <span className="ml-2 text-xs text-yellow-300">
                      ({w.reason})
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {/* Modal for generated questions */}
            {quizModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-[#2a153a] rounded-2xl p-8 shadow-2xl max-w-lg w-full relative">
                  <button
                    onClick={() => setQuizModalOpen(false)}
                    className="absolute top-4 right-4 text-white text-xl"
                  >
                    ×
                  </button>
                  <h4 className="text-xl font-bold text-white mb-4">
                    {selectedQuizCategory} Quiz
                  </h4>
                  <ul className="space-y-4">
                    {quizQuestions.map((q, idx) => (
                      <li key={idx} className="bg-[#3a1c5c]/60 rounded-lg p-4">
                        <div className="text-white font-semibold mb-2">
                          {q.q}
                        </div>
                        <ul className="grid grid-cols-2 gap-2">
                          {q.a.map((ans, i) => (
                            <li
                              key={i}
                              className={`px-3 py-2 rounded-lg bg-purple-800/40 text-white text-sm ${
                                i === q.correct
                                  ? "border border-green-400"
                                  : "border border-transparent"
                              }`}
                            >
                              {ans}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Progress Tab */}
        {selectedTab === "progress" && (
          <div className="max-w-4xl mx-auto bg-[#2a153a]/80 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">İlerleme</h2>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                Simülasyonlar Tamamlandı
              </h3>
              <ul className="flex flex-wrap gap-3">
                {featured
                  .filter((f) => f.status === "completed")
                  .map((f) => (
                    <li
                      key={f.id}
                      className="px-4 py-2 rounded-full bg-blue-700/30 text-white font-semibold"
                    >
                      {f.title}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">
                Quiz Skorları
              </h3>
              <ul className="flex flex-wrap gap-3">
                <li className="px-4 py-2 rounded-full bg-yellow-700/30 text-white font-semibold">
                  Elektrik Devreleri Quiz: 85%
                </li>
                <li className="px-4 py-2 rounded-full bg-yellow-700/30 text-white font-semibold">
                  Kuantum Tünelleme Quiz: 90%
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-pink-400 mb-2">
                Bitirilen Bloglar & Materyaller
              </h3>
              <ul className="flex flex-wrap gap-3">
                {finishedBlogs.map((b) => (
                  <li
                    key={b.title}
                    className="px-4 py-2 rounded-full bg-pink-700/30 text-white font-semibold"
                  >
                    {b.title}
                  </li>
                ))}
                {finishedMaterials.map((m) => (
                  <li
                    key={m.title}
                    className="px-4 py-2 rounded-full bg-pink-700/30 text-white font-semibold"
                  >
                    {m.title}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-400 mb-2">
                Sınıf Bazlı İlerleme
              </h3>
              <ul className="space-y-3">
                {gradeProgress.map((g) => (
                  <li key={g.grade} className="flex items-center gap-4">
                    <span className="w-24 text-white font-semibold">
                      {g.grade}
                    </span>
                    <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-4 bg-gradient-to-r from-blue-400 to-pink-400"
                        style={{ width: `${g.percent}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-white font-bold">
                      {g.percent}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Other tabs can be filled similarly... */}
      </main>
    </div>
  );
}
