"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Sparkles,
  Users,
  BookOpen,
  Zap,
  ArrowRight,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Başlangıç",
    price: "Ücretsiz",
    description: "Temel simülasyonlara erişim ve öğrenme başlangıcı",
    features: [
      "5 temel simülasyon",
      "Sınırlı kullanım süresi",
      "Temel ders içerikleri",
      "Topluluk desteği",
      "E-posta desteği",
    ],
    notIncluded: [
      "Gelişmiş simülasyonlar",
      "Özel ders içerikleri",
      "Öncelikli destek",
      "İlerleme takibi",
    ],
    cta: "Ücretsiz Başla",
    popular: false,
  },
  {
    name: "Öğrenci",
    price: "₺99",
    period: "aylık",
    description: "Öğrenciler için kapsamlı simülasyon paketi",
    features: [
      "Tüm simülasyonlara erişim",
      "Sınırsız kullanım",
      "Detaylı ders içerikleri",
      "İlerleme takibi",
      "Öncelikli destek",
      "Özel ders notları",
      "Sınav hazırlık içerikleri",
    ],
    notIncluded: ["Okul lisansı", "Öğretmen paneli"],
    cta: "Hemen Başla",
    popular: true,
  },
  {
    name: "Okul",
    price: "₺499",
    period: "aylık",
    description: "Okullar için kapsamlı çözüm",
    features: [
      "Tüm simülasyonlara erişim",
      "Sınırsız kullanım",
      "Öğretmen paneli",
      "Sınıf yönetimi",
      "İlerleme raporları",
      "Özel ders içerikleri",
      "7/24 destek",
      "API erişimi",
    ],
    notIncluded: [],
    cta: "İletişime Geç",
    popular: false,
  },
];

const features = [
  {
    name: "Simülasyonlar",
    icon: Sparkles,
    description: "İnteraktif fizik simülasyonları",
  },
  {
    name: "Topluluk",
    icon: Users,
    description: "Aktif öğrenci topluluğu",
  },
  {
    name: "İçerik",
    icon: BookOpen,
    description: "Kapsamlı ders içerikleri",
  },
  {
    name: "Destek",
    icon: Zap,
    description: "7/24 teknik destek",
  },
];

const faqs = [
  {
    question: "Ücretsiz plan ile ne kadar süre kullanabilirim?",
    answer:
      "Ücretsiz plan süresiz olarak kullanılabilir. Temel simülasyonlara ve içeriklere sınırsız erişim sağlarsınız.",
  },
  {
    question: "Öğrenci planına nasıl geçiş yapabilirim?",
    answer:
      "Hesap ayarlarınızdan istediğiniz zaman planınızı yükseltebilirsiniz. Geçiş anında gerçekleşir ve ödeme sonrası tüm özelliklere erişim sağlarsınız.",
  },
  {
    question: "Okul planı için özel teklif alabilir miyim?",
    answer:
      "Evet, okul planı için öğrenci sayısına ve ihtiyaçlarınıza göre özel teklifler sunuyoruz. İletişim formunu doldurarak bizimle iletişime geçebilirsiniz.",
  },
  {
    question: "İade politikası nedir?",
    answer:
      "14 gün içerisinde herhangi bir sebep belirtmeden iade talep edebilirsiniz. İade işlemi 3-5 iş günü içerisinde tamamlanır.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gray-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]" />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Fiyatlandırma
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              İhtiyaçlarınıza uygun planı seçin ve fizik öğrenimini dönüştürün
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Gradient Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />

              {/* Pricing Card */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 group-hover:border-gray-700 transition-colors h-full">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                      En Popüler
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <X className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/register" className="block w-full">
                  <Button
                    className={`w-full h-12 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Tüm Planlarda Bulunan Özellikler
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Sıkça Sorulan Sorular
            </span>
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/contact">
            <Button
              variant="outline"
              className="h-12 px-8 group border-gray-800 hover:border-gray-700"
            >
              Daha fazla bilgi alın
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
