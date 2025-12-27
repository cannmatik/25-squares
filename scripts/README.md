# 25 Squares - Level Generator Scripts

## Genel Bakış

Bu klasördeki scriptler, oyun level'larını oluşturmak için kullanılır.

## Dosya Akışı

```
find_all_paths.py     →  all_valid_paths.json (16MB, 12,400 path)
        ↓
generate_world_levels.py  →  world1_levels.json
                          →  world2_levels.json  
                          →  world3_levels.json
        ↓
update-levels.js      →  src/lib/levels.js
```

## all_valid_paths.json Hakkında

Bu dosya `find_all_paths.py` tarafından **exhaustive backtracking** ile oluşturulmuştur.

**Önemli Özellikler:**
- Toplam **12,400 valid path** içerir
- Her path **25 karenin tamamını** ziyaret eder
- Her başlangıç pozisyonu için yüzlerce path mevcuttur
- Path'ler şu hamle kurallarına uyar:
  - Yatay/Dikey: 3 kare
  - Çapraz: 2 kare (her iki yönde)

**Başlangıç Pozisyonuna Göre Path Sayıları:**
| Köşeler (552) | Kenarlar (548) | İç (400-412) | Merkez (352) |
|---------------|----------------|--------------|--------------|
| (0,0), (0,4)  | (0,1), (1,0)   | (1,1), (1,3) | (2,2) = 352  |
| (4,0), (4,4)  | (4,1), (3,0)   | (3,1), (3,3) | path         |

## Script Kullanımı

```bash
# 1. Tüm valid path'leri bul (sadece bir kez çalıştırılmalı)
python find_all_paths.py

# 2. World level'larını oluştur
python generate_world_levels.py

# 3. src/lib/levels.js dosyasını güncelle
node update-levels.js
```

## World Kuralları

### World 1
- Tutorial + temel oynanış
- Blocked squares
- Fixed start
- Time challenge

### World 2 - Predefined Kareler
- **Level 1-10:** Tek predefined kare (moveNumber ≤ 9)
- **Level 11-20:** İki predefined kare (ilki ≤ 9, fark 3-4 hamle)
- **Level 21-25:** Üç predefined kare (Move 3, 6, 9)

### World 3 - Combined Mechanics
- **Level 1-8:** 0 blocked, 1 predefined (Move 4-10)
- **Level 9-16:** 1 blocked, 1 predefined
- **Level 17-25:** 2 blocked, 2 predefined (gap >= 3)

### World 4-25 - Dynamic Difficulty

| World | First Predefined | Gap | Blocked | minMoves |
|-------|-----------------|-----|---------|----------|
| 4-5 | Move 5 | 3-4 | 0-2 | path-5 |
| 6-10 | Move 6 | 4-5 | 0-2 | path-5 |
| 11-15 | Move 7 | 5-7 | 1-3 | path-3 |
| 16-20 | Move 9 | 6-8 | 2-4 | path-2 |
| 21-25 | Move 11 | 7-10 | 2-5 | path-1 |

**Balance Rule:** `blocked + predefined <= path_len / 3`

