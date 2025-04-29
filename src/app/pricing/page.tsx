"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Basic",
    description: "Bireysel öğrenciler için temel fizik simülasyonları",
    monthlyPrice: "49",
    annualPrice: "39",
    features: [
      "10 GB Depolama",
      "5 Temel Simülasyon",
      "Temel Analiz Araçları",
      "E-posta Desteği",
      "Topluluk Erişimi",
    ],
    cta: "Ücretsiz Dene",
    highlight: false,
  },
  {
    name: "Professional",
    description:
      "Daha fazla simülasyon ve gelişmiş özellikler isteyen öğrenciler için",
    monthlyPrice: "99",
    annualPrice: "79",
    features: [
      "100 GB Depolama",
      "Tüm Simülasyonlara Erişim",
      "Gelişmiş Analiz Araçları",
      "Öncelikli Destek",
      "API Erişimi",
      "İlerleme Takibi",
      "Özel Ders İçerikleri",
    ],
    cta: "Hemen Başla",
    highlight: true,
    extraText: "+ ₺20 / öğrenci başına",
  },
  {
    name: "Enterprise",
    description: "Okullar ve kurumlar için özelleştirilmiş çözümler",
    monthlyPrice: "299",
    annualPrice: "239",
    features: [
      "Sınırsız Depolama",
      "Özel Simülasyonlar",
      "Gelişmiş Raporlama",
      "7/24 Öncelikli Destek",
      "Özel API Geliştirme",
      "Beyaz Etiket Çözümler",
      "Özel Entegrasyonlar",
    ],
    cta: "İletişime Geç",
    highlight: false,
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#030711] py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-blue-950/60 px-3 py-1 text-sm text-blue-300 mb-6"
          >
            Auxit tarafından desteklenmektedir
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium text-white mb-4"
          >
            İhtiyacınıza uygun tüm fizik
            <br />
            simülasyonları tek pakette
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-12"
          >
            Tüm simülasyonları tek bir platformda toplayın ve merkezi bir
            öğrenme deneyimi yaşayın. Kredi kartı gerekmez.
          </motion.p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className="text-gray-400">Aylık</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                isAnnual ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-gray-400">
              Yıllık <span className="text-blue-400">%20 indirim</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl ${
                plan.highlight
                  ? "bg-blue-600 border-2 border-blue-400"
                  : "bg-gray-900/50 border border-gray-800"
              } backdrop-blur-sm p-8`}
            >
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-medium text-white">₺</span>
                  <span className="text-5xl font-medium text-white">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-400">/ay</span>
                </div>
                {plan.extraText && (
                  <div className="text-sm text-gray-400 mt-2">
                    {plan.extraText}
                  </div>
                )}
              </div>

              <Button
                className={`w-full h-12 mb-8 ${
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-gray-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check
                      className={`w-5 h-5 ${
                        plan.highlight ? "text-blue-300" : "text-blue-400"
                      }`}
                    />
                    <span
                      className={
                        plan.highlight ? "text-blue-100" : "text-gray-300"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
