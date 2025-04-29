"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Search,
  ChevronDown,
  Sparkles,
  BookOpen,
  Users,
  GraduationCap,
  ArrowRight,
  Newspaper,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/common/Logo";

const navigation = [
  {
    name: "Simülasyonlar",
    href: "/simulations",
    icon: Sparkles,
  },
  {
    name: "Öğrenme Merkezi",
    href: "/learn",
    icon: BookOpen,
  },
  {
    name: "Blog",
    href: "/blogs",
    icon: Newspaper,
  },
  {
    name: "Ücretlendirme",
    href: "/pricing",
    icon: GraduationCap,
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg group-hover:bg-white/5"
                >
                  <item.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  {item.name}
                </Link>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link href="/register" className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />
                  <Button className="relative bg-gray-900 hover:bg-gray-800 text-white border-0">
                    Ücretsiz Başla
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              type="button"
              className="lg:hidden relative inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Ana menüyü aç</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={
            mobileMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          className="lg:hidden overflow-hidden"
        >
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5 text-gray-400" />
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-800 my-4" />
            <div className="flex flex-col gap-2 px-3">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-3 py-2 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Ücretsiz Başla
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
