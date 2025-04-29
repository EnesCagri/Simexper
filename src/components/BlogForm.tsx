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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { X, Check, ChevronsUpDown, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPostData, SimulationData } from "@/db/types";
import { useBlogs } from "@/hooks/useBlogs";
import Image from "next/image";

interface BlogFormProps {
  initialData?: BlogPostData;
  mode: "create" | "edit";
  simulations?: SimulationData[];
}

const categories = [
  { value: "teknoloji", label: "Teknoloji" },
  { value: "bilim", label: "Bilim" },
  { value: "egitim", label: "Eğitim" },
  { value: "diger", label: "Diğer" },
];

export default function BlogForm({
  initialData,
  mode,
  simulations = [],
}: BlogFormProps) {
  const router = useRouter();
  const { createPost, updatePost } = useBlogs();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPostData>>(
    initialData || {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: "",
      author: {
        name: "",
        avatar: "",
      },
      date: new Date().toISOString().split("T")[0],
      readingTime: "5 dk",
      keywords: [],
      relatedMaterials: [],
      relatedSimulations: [],
      metaDescription: "",
      metaKeywords: [],
      status: "draft",
      coverImage: "",
    }
  );

  const [openKeywords, setOpenKeywords] = useState(false);
  const [openSimulations, setOpenSimulations] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );

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
        await createPost(formData as BlogPostData);
      } else {
        await updatePost(formData.slug!, formData as BlogPostData);
      }
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Blog yazısı kaydedilirken bir hata oluştu.");
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

  const handleSimulationToggle = (simulation: string) => {
    setFormData((prev) => {
      const currentSimulations = prev.relatedSimulations || [];
      const newSimulations = currentSimulations.includes(simulation)
        ? currentSimulations.filter((s) => s !== simulation)
        : [...currentSimulations, simulation];
      return { ...prev, relatedSimulations: newSimulations };
    });
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          coverImage: reader.result as string,
        }));
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
          {coverImagePreview || formData.coverImage ? (
            <div className="relative w-full h-full">
              <Image
                src={coverImagePreview || formData.coverImage || ""}
                alt="Cover"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverImagePreview(null);
                  setFormData((prev) => ({ ...prev, coverImage: "" }));
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
                onChange={handleCoverImageChange}
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
            placeholder="Blog yazısı başlığı"
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Slug</label>
          <Input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="blog-yazisi-slug"
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
          <label className="text-sm font-medium text-gray-400">Durum</label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger className="bg-gray-900/50 border-gray-800">
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800">
              <SelectItem value="draft">Taslak</SelectItem>
              <SelectItem value="published">Yayınlandı</SelectItem>
              <SelectItem value="archived">Arşivlendi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Yazar Adı</label>
          <Input
            name="author.name"
            value={formData.author?.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                author: { ...prev.author, name: e.target.value },
              }))
            }
            placeholder="Yazar adı"
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Yazar Avatar URL
          </label>
          <Input
            name="author.avatar"
            value={formData.author?.avatar}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                author: { ...prev.author, avatar: e.target.value },
              }))
            }
            placeholder="https://example.com/avatar.jpg"
            className="bg-gray-900/50 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Okuma Süresi
          </label>
          <Input
            name="readingTime"
            value={formData.readingTime}
            onChange={handleChange}
            placeholder="5 dk"
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Tarih</label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="bg-gray-900/50 border-gray-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">Özet</label>
        <Textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Blog yazısı özeti"
          required
          className="bg-gray-900/50 border-gray-800 min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">İçerik</label>
        <Textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog yazısı içeriği"
          required
          className="bg-gray-900/50 border-gray-800 min-h-[300px]"
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
          İlgili Simülasyonlar
        </label>
        <Popover open={openSimulations} onOpenChange={setOpenSimulations}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openSimulations}
              className="w-full justify-between bg-gray-900/50 border-gray-800"
            >
              Simülasyon seçin
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-gray-900 border-gray-800">
            <Command>
              <CommandInput placeholder="Simülasyon ara..." />
              <CommandEmpty>Simülasyon bulunamadı.</CommandEmpty>
              <CommandGroup>
                {simulations.map((simulation) => (
                  <CommandItem
                    key={simulation.id}
                    onSelect={() => handleSimulationToggle(simulation.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        formData.relatedSimulations?.includes(simulation.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {simulation.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.relatedSimulations?.map((simulationId) => {
            const simulation = simulations.find((s) => s.id === simulationId);
            return (
              <Badge
                key={simulationId}
                variant="secondary"
                className="bg-gray-800 text-gray-300"
              >
                {simulation?.title}
                <button
                  type="button"
                  onClick={() => handleSimulationToggle(simulationId)}
                  className="ml-1 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">
          Meta Açıklama
        </label>
        <Textarea
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
          placeholder="SEO için meta açıklama"
          className="bg-gray-900/50 border-gray-800 min-h-[100px]"
        />
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
