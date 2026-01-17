# Simülasyon Ekleme Rehberi

## Hızlı Başlangıç

1. Unity WebGL build'inizi `public/webgl-app/<klasör-adı>/` klasörüne ekleyin
2. Simülasyonu eklemek için script çalıştırın:
   ```bash
   node scripts/add-simulation.js "Simülasyon Adı" "WebGL-Klasör-Adı"
   ```
3. `src/db/simulations.json` dosyasında simülasyon içeriğini düzenleyin

## Örnek Kullanım

```bash
# Örnek: Kaldırma Kuvveti simülasyonu ekleme
node scripts/add-simulation.js "Kaldırma Kuvveti" "Buouncy"
```

Bu komut:
- Slug oluşturur: `kaldirma-kuvveti`
- WebGL klasörünü slug'a göre yeniden adlandırır (eğer farklıysa)
- `simulations.json`'a simülasyonu ekler
- WebGL dosyalarını formatlar

## Simülasyon İçeriği Düzenleme

`src/db/simulations.json` dosyasında her simülasyon için şu alanları düzenleyin:

### Zorunlu Alanlar

- **title**: Simülasyon başlığı (örn: "Kaldırma Kuvveti")
- **slug**: URL'de kullanılacak slug (otomatik oluşturulur)
- **description**: Kısa açıklama
- **category**: Kategori (mekanik, optik, termodinamik, kimya, dalgalar, enerji)
- **difficulty**: Zorluk seviyesi (Kolay, Orta, Zor)
- **classLevel**: Sınıf seviyesi (3-12)
- **webglPath**: WebGL dosya yolu (otomatik oluşturulur)

### İçerik Alanları

#### learningObjectives (Kazanımlar)
```json
"learningObjectives": [
  "Kaldırma kuvvetini anlama",
  "Archimedes prensibini öğrenme",
  "Yoğunluk kavramını kavrama"
]
```

#### physicsExplanation (Fizik Açıklaması)
```json
"physicsExplanation": {
  "formulas": [
    "Archimedes Prensibi: F = ρgV",
    "Yoğunluk: ρ = m/V"
  ],
  "concepts": [
    "Kaldırma kuvveti",
    "Yoğunluk",
    "Sıvı basıncı",
    "Archimedes prensibi"
  ]
}
```

#### relatedMaterials.examQuestions (Çıkmış Sorular)
```json
"relatedMaterials": {
  "examQuestions": [
    {
      "year": "2023",
      "examType": "AYT",
      "question": "Soru metni buraya...",
      "correctAnswer": "Doğru cevap",
      "explanation": "Açıklama buraya..."
    }
  ],
  "examStats": {
    "totalQuestions": 45,
    "lastAskedYear": "2023",
    "frequencyPercentage": 85,
    "averageDifficulty": 3.8
  }
}
```

#### detailedDescription (Detaylı Açıklama)
Uzun, açıklayıcı bir metin. Simülasyonun ne yaptığını, hangi kavramları öğrettiğini anlatır.

## Kategori Gradient'leri

- **mekanik**: `from-blue-500 to-cyan-500`
- **elektromanyetizma**: `from-purple-500 to-pink-500`
- **optik**: `from-green-500 to-emerald-500`
- **termodinamik**: `from-yellow-500 to-amber-500`
- **modern-fizik**: `from-red-500 to-orange-500`
- **kimya**: `from-cyan-500 to-blue-500`
- **dalgalar**: `from-purple-500 to-indigo-500`
- **enerji**: `from-green-500 to-emerald-500`

## Notlar

- Klasör isimleri slug ile eşleşmelidir (Türkçe karakterler temizlenir)
- WebGL dosyaları otomatik olarak formatlanır
- Fullscreen desteği otomatik olarak eklenir
- Her simülasyon için benzersiz slug kullanılmalıdır

