"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Plus } from "lucide-react";
import { SimulationData } from "@/db/types";
import { useSimulations } from "@/hooks/useSimulations";
import Image from "next/image";

interface SimulationFormProps {
  initialData?: SimulationData;
  mode: "create" | "edit";
}

const categories = [
  { value: "mechanics", label: "Mekanik" },
  { value: "energy", label: "Enerji" },
  { value: "waves", label: "Dalgalar" },
  { value: "thermodynamics", label: "Termodinamik" },
  { value: "electromagnetism", label: "Elektromanyetizma" },
  { value: "modern-physics", label: "Modern Fizik" },
];

const difficulties = [
  { value: "beginner", label: "Başlangıç" },
  { value: "intermediate", label: "Orta" },
  { value: "advanced", label: "İleri" },
];

export default function SimulationForm({
  initialData,
  mode,
}: SimulationFormProps) {
  const router = useRouter();
  const { createSimulation, updateSimulation } = useSimulations();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<SimulationData>>(
    initialData || {
      title: "",
      description: "",
      category: "",
      difficulty: "beginner",
      completionTime: "10 dk",
      points: 100,
      gradient: "from-blue-500 to-cyan-500",
      unit: "",
      unitOrder: 1,
      image: "",
      keywords: [],
      detailedDescription: "",
      learningObjectives: [],
      physicsExplanation: {
        formulas: [],
        concepts: [],
      },
    }
  );

  const [keywordInput, setKeywordInput] = useState("");
  const [objectiveInput, setObjectiveInput] = useState("");
  const [formulaInput, setFormulaInput] = useState("");
  const [conceptInput, setConceptInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        await createSimulation(formData as SimulationData);
      } else {
        await updateSimulation(formData.id!, formData as SimulationData);
      }
      router.push("/admin/simulations");
      router.refresh();
    } catch (error) {
      console.error("Error saving simulation:", error);
      alert("Simülasyon kaydedilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeywordAdd = () => {
    if (
      keywordInput.trim() &&
      !formData.keywords?.includes(keywordInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...(prev.keywords || []), keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const handleKeywordRemove = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords?.filter((k) => k !== keyword),
    }));
  };

  const handleObjectiveAdd = () => {
    if (objectiveInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        learningObjectives: [
          ...(prev.learningObjectives || []),
          objectiveInput.trim(),
        ],
      }));
      setObjectiveInput("");
    }
  };

  const handleObjectiveRemove = (objective: string) => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives?.filter(
        (o) => o !== objective
      ),
    }));
  };

  const handleFormulaAdd = () => {
    if (formulaInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        physicsExplanation: {
          ...prev.physicsExplanation,
          formulas: [
            ...(prev.physicsExplanation?.formulas || []),
            formulaInput.trim(),
          ],
        },
      }));
      setFormulaInput("");
    }
  };

  const handleFormulaRemove = (formula: string) => {
    setFormData((prev) => ({
      ...prev,
      physicsExplanation: {
        ...prev.physicsExplanation,
        formulas: prev.physicsExplanation?.formulas?.filter(
          (f) => f !== formula
        ),
      },
    }));
  };

  const handleConceptAdd = () => {
    if (conceptInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        physicsExplanation: {
          ...prev.physicsExplanation,
          concepts: [
            ...(prev.physicsExplanation?.concepts || []),
            conceptInput.trim(),
          ],
        },
      }));
      setConceptInput("");
    }
  };

  const handleConceptRemove = (concept: string) => {
    setFormData((prev) => ({
      ...prev,
      physicsExplanation: {
        ...prev.physicsExplanation,
        concepts: prev.physicsExplanation?.concepts?.filter(
          (c) => c !== concept
        ),
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Cover Image */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">
          Kapak Görseli
        </label>
        <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-700 hover:border-blue-500 transition-colors">
          {imagePreview || formData.image ? (
            <div className="relative w-full h-full">
              <Image
                src={imagePreview || formData.image || ""}
                alt="Cover"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setFormData((prev) => ({ ...prev, image: "" }));
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">
                Görsel yüklemek için tıklayın
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Başlık</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Simülasyon başlığı"
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Kategori</label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger className="bg-gray-900/50 border-gray-800">
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Zorluk</label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => handleSelectChange("difficulty", value)}
          >
            <SelectTrigger className="bg-gray-900/50 border-gray-800">
              <SelectValue placeholder="Zorluk seçin" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800">
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Tamamlanma Süresi
          </label>
          <Input
            name="completionTime"
            value={formData.completionTime}
            onChange={handleChange}
            placeholder="10 dk"
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Puan</label>
          <Input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            placeholder="100"
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Gradient</label>
          <Input
            name="gradient"
            value={formData.gradient}
            onChange={handleChange}
            placeholder="from-blue-500 to-cyan-500"
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Ünite</label>
          <Input
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="Mekanik"
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Ünite Sırası
          </label>
          <Input
            type="number"
            name="unitOrder"
            value={formData.unitOrder}
            onChange={handleChange}
            placeholder="1"
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">Açıklama</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Simülasyon açıklaması"
          required
          className="bg-gray-900/50 border-gray-800 min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">
          Detaylı Açıklama
        </label>
        <Textarea
          name="detailedDescription"
          value={formData.detailedDescription}
          onChange={handleChange}
          placeholder="Simülasyon detaylı açıklaması"
          required
          className="bg-gray-900/50 border-gray-800 min-h-[200px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">
          Anahtar Kelimeler
        </label>
        <div className="flex gap-2">
          <Input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Anahtar kelime ekle"
            className="bg-gray-900/50 border-gray-800"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleKeywordAdd();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleKeywordAdd}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Ekle
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.keywords?.map((keyword) => (
            <Badge
              key={keyword}
              variant="secondary"
              className="bg-gray-800 text-gray-300"
            >
              {keyword}
              <button
                type="button"
                onClick={() => handleKeywordRemove(keyword)}
                className="ml-1 hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">
          Öğrenme Hedefleri
        </label>
        <div className="flex gap-2">
          <Input
            value={objectiveInput}
            onChange={(e) => setObjectiveInput(e.target.value)}
            placeholder="Öğrenme hedefi ekle"
            className="bg-gray-900/50 border-gray-800"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleObjectiveAdd();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleObjectiveAdd}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Ekle
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.learningObjectives?.map((objective) => (
            <Badge
              key={objective}
              variant="secondary"
              className="bg-gray-800 text-gray-300"
            >
              {objective}
              <button
                type="button"
                onClick={() => handleObjectiveRemove(objective)}
                className="ml-1 hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Formüller</label>
          <div className="flex gap-2">
            <Input
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
              placeholder="Formül ekle"
              className="bg-gray-900/50 border-gray-800"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleFormulaAdd();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleFormulaAdd}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Ekle
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.physicsExplanation?.formulas?.map((formula) => (
              <Badge
                key={formula}
                variant="secondary"
                className="bg-gray-800 text-gray-300"
              >
                {formula}
                <button
                  type="button"
                  onClick={() => handleFormulaRemove(formula)}
                  className="ml-1 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Kavramlar</label>
          <div className="flex gap-2">
            <Input
              value={conceptInput}
              onChange={(e) => setConceptInput(e.target.value)}
              placeholder="Kavram ekle"
              className="bg-gray-900/50 border-gray-800"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleConceptAdd();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleConceptAdd}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Ekle
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.physicsExplanation?.concepts?.map((concept) => (
              <Badge
                key={concept}
                variant="secondary"
                className="bg-gray-800 text-gray-300"
              >
                {concept}
                <button
                  type="button"
                  onClick={() => handleConceptRemove(concept)}
                  className="ml-1 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="bg-gray-900/50 border-gray-800"
        >
          İptal
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {loading
            ? "Kaydediliyor..."
            : mode === "create"
            ? "Oluştur"
            : "Güncelle"}
        </Button>
      </div>
    </form>
  );
}
