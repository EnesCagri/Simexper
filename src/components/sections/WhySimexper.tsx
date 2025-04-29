"use client";

import { motion } from "framer-motion";
import { Atom, BookOpen, Brain, FileText, FlaskConical } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: any; // Lucide icon component type
  position: "main" | "top" | "right" | "bottom" | "left";
}

interface ServiceCardProps {
  service: Service;
  isMain?: boolean;
}

const services: Service[] = [
  {
    title: "Gerçek Zamanlı İnteraktif Simülasyon",
    description:
      "Fizik kavramlarını gerçek zamanlı yanıt veren canlı, interaktif 3D simülasyonlar aracılığıyla deneyimleyin.",
    icon: Atom,
    position: "main",
  },
  {
    title: "Eğitim Materyalleri",
    description:
      "Müfredatınız ve öğrenme hedeflerinizle uyumlu kapsamlı çalışma materyalleri.",
    icon: BookOpen,
    position: "top",
  },
  {
    title: "Kişiselleştirilmiş AI Koç",
    description:
      "Gelişmiş AI teknolojisi ile desteklenen kişiselleştirilmiş öğrenme rehberliği alın.",
    icon: Brain,
    position: "right",
  },
  {
    title: "Bloglar",
    description:
      "Fizik eğitimi ve bilimsel keşiflerdeki en son gelişmelerden haberdar olun.",
    icon: FileText,
    position: "bottom",
  },
  {
    title: "Test Oluşturucu",
    description:
      "Geçmiş sorular ve öğrenme ilerlemenize göre pratik testler oluşturun.",
    icon: FlaskConical,
    position: "left",
  },
];

export function WhySimexper() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#030711]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_50%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2% 5%, rgba(59, 130, 246, 0.05) 0%, transparent 10%),
                           radial-gradient(circle at 98% 35%, rgba(236, 72, 153, 0.05) 0%, transparent 10%),
                           radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 10%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Neden{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
              Simexper?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fizik öğrenme deneyiminizi geliştirmek için tasarlanmış kapsamlı
            araç ve hizmetlerimizi keşfedin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={service.position === "main" ? "md:col-span-2" : ""}
            >
              <div className="relative group h-full">
                {/* Card Background with Grid */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>

                {/* Card Content */}
                <div className="relative p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-400">{service.description}</p>

                  {/* Connecting Nodes */}
                  {service.position !== "main" && (
                    <div className="absolute -inset-1 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                    </div>
                  )}
                </div>

                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
