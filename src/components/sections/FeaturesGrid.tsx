"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  BookOpen,
  Users,
  BarChart3,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "İnteraktif Simülasyonlar",
    description:
      "Fizik kavramlarını görsel ve etkileşimli simülasyonlarla deneyimleyin. Her simülasyon gerçek dünya senaryolarını yansıtır.",
    icon: Brain,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Anlık Geri Bildirim",
    description:
      "Her deneyimde anında geri bildirim alın. Hatalarınızı görün ve doğru çözümleri öğrenin.",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Kapsamlı İçerik",
    description:
      "Lise ve üniversite seviyesinde fizik konularını kapsayan geniş bir içerik kütüphanesi.",
    icon: BookOpen,
    color: "from-pink-500 to-pink-600",
  },
  {
    title: "Topluluk Öğrenimi",
    description:
      "Diğer öğrencilerle etkileşime geçin, deneyimlerinizi paylaşın ve birlikte öğrenin.",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "İlerleme Takibi",
    description:
      "Öğrenme sürecinizi takip edin, güçlü ve zayıf yönlerinizi görün ve hedeflerinize ulaşın.",
    icon: BarChart3,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Öğrenme Yolculuğu",
    description:
      "Kişiselleştirilmiş öğrenme yolları ile kendi hızınızda ilerleyin ve başarıya ulaşın.",
    icon: Lightbulb,
    color: "from-pink-500 to-pink-600",
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Neden Simexper?
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Fizik öğrenimini dönüştüren benzersiz özellikler ve avantajlar
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Gradient Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />

              {/* Feature Card */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 group-hover:border-gray-700 transition-colors h-full">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6">{feature.description}</p>

                {/* Learn More Link */}
                <Link
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
                >
                  Daha fazla bilgi
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/simulations"
            className="inline-flex items-center text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors group"
          >
            Tüm özellikleri keşfedin
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-8 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
}
