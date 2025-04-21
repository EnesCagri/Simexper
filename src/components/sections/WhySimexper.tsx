"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Users,
  Glasses,
  Rocket,
  Building2,
  Users2,
  Gamepad2,
} from "lucide-react";

const benefits = [
  {
    title: "Doğru Kişilerle Buluşma",
    description:
      "Öğrenciler, öğretmenler ve eğitim kurumlarının kesiştiği buluşma noktası.",
    Icon: Users,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Şeffaf ve Erişilebilir Yapı",
    description:
      "Herkesin katılabileceği ve katkı sunabileceği açık bir sistem.",
    Icon: Glasses,
    gradient: "from-pink-500 to-red-500",
  },
  {
    title: "Gerçek Potansiyele Ulaşma",
    description: "Öğrencilerin yeteneklerini ve fikirlerini görünür kılıyoruz.",
    Icon: Rocket,
    gradient: "from-red-500 to-orange-500",
  },
];

const categories = [
  {
    title: "Bireysel Öğrenciler",
    Icon: Users2,
  },
  {
    title: "Eğitim Kurumları",
    Icon: Building2,
  },
  {
    title: "Fizik Meraklıları",
    Icon: Gamepad2,
  },
];

export function WhySimexper() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.15),transparent_50%)]" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side - Image and Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl" />
              <img
                src="images/student-physics.jpg"
                alt="Student exploring physics simulation"
                className="rounded-2xl relative z-10 w-full object-cover shadow-xl"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors"
                >
                  <category.Icon className="w-6 h-6 text-purple-400" />
                  <span className="text-sm text-gray-300 text-center">
                    {category.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                Neden Simexper?
              </span>
            </h2>

            <p className="text-gray-300 mb-8 text-lg">
              Simexper sayesinde öğrenciler fiziği interaktif bir şekilde
              keşfeder, eğitmenler projelerini sergiler, ve herkes keyifli bir
              öğrenme deneyiminin parçası olur.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                    <div className="p-6 flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${benefit.gradient} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <benefit.Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-300">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
