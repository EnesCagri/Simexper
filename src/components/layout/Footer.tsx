"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

const navigation = {
  main: [
    { name: "Ana Sayfa", href: "/" },
    { name: "Simülasyonlar", href: "/simulations" },
    { name: "Hakkımızda", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "İletişim", href: "/contact" },
  ],
  resources: [
    { name: "Dokümantasyon", href: "/docs" },
    { name: "API", href: "/api-docs" },
    { name: "Öğretmen Kaynakları", href: "/teacher-resources" },
    { name: "Öğrenci Rehberi", href: "/student-guide" },
  ],
  legal: [
    { name: "Gizlilik Politikası", href: "/privacy" },
    { name: "Kullanım Şartları", href: "/terms" },
    { name: "KVKK", href: "/kvkk" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/simexper",
      icon: Github,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/simexper",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/simexper",
      icon: Linkedin,
    },
  ],
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@simexper.com",
    href: "mailto:info@simexper.com",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 (555) 123 4567",
    href: "tel:+905551234567",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Teknopark İstanbul",
    href: "https://maps.google.com/?q=Teknopark+İstanbul",
  },
];

export function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Simexper
                </span>
              </Link>
              <div className="mt-6 text-sm leading-6 text-gray-400 border-l-2 border-blue-500/20 pl-4">
                Fizik eğitimini interaktif simülasyonlarla daha eğlenceli ve
                anlaşılır hale getiriyoruz.
              </div>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-4 pt-4 border-t border-gray-800">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-2 rounded-lg bg-gray-900 group-hover:bg-blue-500/10 transition-colors">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm group-hover:underline">
                    {item.value}
                  </span>
                  <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
            <h3 className="text-sm font-semibold leading-6 text-white bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Hızlı Erişim
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.main.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <div className="h-1 w-1 rounded-full bg-blue-500/50 mr-2 group-hover:scale-150 transition-transform" />
                    {item.name}
                    <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
            <h3 className="text-sm font-semibold leading-6 text-white bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Kaynaklar
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.resources.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <div className="h-1 w-1 rounded-full bg-pink-500/50 mr-2 group-hover:scale-150 transition-transform" />
                    {item.name}
                    <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
            <h3 className="text-sm font-semibold leading-6 text-white bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              Yasal
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.legal.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <div className="h-1 w-1 rounded-full bg-blue-500/50 mr-2 group-hover:scale-150 transition-transform" />
                    {item.name}
                    <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold leading-6 text-white bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Sosyal Medya
              </h3>
              <div className="mt-4 flex space-x-4">
                {navigation.social.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="relative p-3 text-gray-400 hover:text-white transition-colors group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5 relative z-10 transform group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-16 pt-8 sm:mt-20 lg:mt-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Simexper. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center space-x-1 text-sm text-gray-400">
                <span>Powered by</span>
                <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent font-semibold">
                  Next.js
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
