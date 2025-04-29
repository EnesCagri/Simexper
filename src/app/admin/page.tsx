"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Video,
  BookOpen,
  FileText,
  Plus,
  Users,
  Star,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { getSimulations, getMaterials, getBlogPosts } from "@/db/utils";

export default function AdminDashboard() {
  const simulations = getSimulations();
  const materials = getMaterials();
  const blogPosts = getBlogPosts();

  const stats = [
    {
      title: "Toplam Simülasyon",
      value: simulations.length,
      icon: Video,
      color: "text-blue-400",
    },
    {
      title: "Toplam Materyal",
      value: materials.length,
      icon: BookOpen,
      color: "text-purple-400",
    },
    {
      title: "Toplam Blog Yazısı",
      value: blogPosts.length,
      icon: FileText,
      color: "text-green-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/admin/simulations/new">
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Simülasyon
            </Button>
          </Link>
          <Link href="/admin/materials/new">
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Materyal
            </Button>
          </Link>
          <Link href="/admin/blogs/new">
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gray-800/50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Son Aktiviteler
        </h2>
        <div className="space-y-4">
          {simulations.slice(0, 5).map((simulation) => (
            <div
              key={simulation.id}
              className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Video className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{simulation.title}</p>
                  <p className="text-sm text-gray-400">
                    {simulation.category} • {simulation.difficulty}
                  </p>
                </div>
              </div>
              <Link
                href={`/admin/simulations/${simulation.id}`}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Düzenle
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
