"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Edit,
  Trash,
  Eye,
  Search,
  Filter,
  FileText,
  X,
  Clock,
  User,
  Calendar,
  Tag,
  BookOpen,
  GraduationCap,
  Target,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSimulations } from "@/hooks/useSimulations";
import { SimulationData } from "@/db/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SimulationForm from "./SimulationForm";

export default function SimulationGrid() {
  const router = useRouter();
  const {
    simulations,
    loading,
    error,
    fetchSimulations,
    deleteSimulation,
    searchSimulations,
  } = useSimulations();
  const [search, setSearch] = useState("");
  const [selectedSimulation, setSelectedSimulation] =
    useState<SimulationData | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchSimulations();
  }, [fetchSimulations]);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim()) {
      searchSimulations(value);
    } else {
      fetchSimulations();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bu simülasyonu silmek istediğinizden emin misiniz?")) {
      const success = await deleteSimulation(id);
      if (success) {
        router.refresh();
      }
    }
  };

  const handleEdit = (simulation: SimulationData) => {
    setSelectedSimulation(simulation);
    setIsEditModalOpen(true);
  };

  const handleView = (simulation: SimulationData) => {
    setSelectedSimulation(simulation);
    setIsViewModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-400">Hata: {error}</p>
          <Button
            onClick={() => fetchSimulations()}
            className="mt-4 bg-blue-500 hover:bg-blue-600"
          >
            Tekrar Dene
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Simülasyonlar</h1>
          <p className="text-gray-400 mt-1">Tüm simülasyonları yönetin</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Simülasyon
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Yeni Simülasyon
              </DialogTitle>
            </DialogHeader>
            <SimulationForm mode="create" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Simülasyon ara..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-gray-900/50 border-gray-800 h-12"
          />
        </div>
        <Button
          variant="outline"
          className="bg-gray-900/50 border-gray-800 h-12"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtrele
        </Button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simulations.map((simulation) => (
          <Card
            key={simulation.id}
            className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
          >
            <CardHeader className="p-0">
              {simulation.image && (
                <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                  <Image
                    src={simulation.image}
                    alt={simulation.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">
                    {simulation.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400 mt-2">
                  {simulation.category}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <p className="text-gray-400 line-clamp-3">
                {simulation.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{simulation.completionTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>{simulation.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span>{simulation.points} puan</span>
                </div>
              </div>
              {simulation.keywords && simulation.keywords.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {simulation.keywords.slice(0, 3).map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="bg-gray-800 text-gray-300"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {keyword}
                    </Badge>
                  ))}
                  {simulation.keywords.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300"
                    >
                      +{simulation.keywords.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6 pt-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleView(simulation)}
                className="text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(simulation)}
                className="text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(simulation.id)}
                className="text-red-400 hover:text-red-300 hover:bg-gray-800/50"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Simülasyonu Düzenle
            </DialogTitle>
          </DialogHeader>
          {selectedSimulation && (
            <SimulationForm mode="edit" initialData={selectedSimulation} />
          )}
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Simülasyon Detayları
            </DialogTitle>
          </DialogHeader>
          {selectedSimulation && (
            <div className="space-y-8">
              {selectedSimulation.image && (
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <Image
                    src={selectedSimulation.image}
                    alt={selectedSimulation.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {selectedSimulation.title}
                </h2>
                <p className="text-gray-400 text-lg mb-6">
                  {selectedSimulation.description}
                </p>
                <div className="prose prose-invert max-w-none">
                  {selectedSimulation.detailedDescription}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    Öğrenme Hedefleri
                  </h3>
                  <ul className="space-y-2">
                    {selectedSimulation.learningObjectives.map(
                      (objective, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-400"
                        >
                          <Target className="w-5 h-5 text-blue-400 mt-0.5" />
                          <span>{objective}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    Fizik Açıklaması
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">
                        Formüller
                      </h4>
                      <ul className="space-y-2">
                        {selectedSimulation.physicsExplanation.formulas.map(
                          (formula, index) => (
                            <li key={index} className="text-gray-400">
                              {formula}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">
                        Kavramlar
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSimulation.physicsExplanation.concepts.map(
                          (concept, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-gray-800 text-gray-300"
                            >
                              {concept}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSimulation.keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    className="bg-gray-800 text-gray-300"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {keyword}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    Tamamlanma Süresi: {selectedSimulation.completionTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>Zorluk: {selectedSimulation.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span>Puan: {selectedSimulation.points}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
