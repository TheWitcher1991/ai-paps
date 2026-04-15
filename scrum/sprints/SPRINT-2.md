# Sprint 2: Справочники и каталоги

**Длительность:** 2 недели  
**Цель спринта:** Реализовать справочную систему растений, болезней и вредителей.

---

## Sprint Goal

> Как агроном, я хочу иметь справочную систему растений и болезней, чтобы получать информацию о симптомах и методах лечения.

---

## User Stories в спринте

### US-2.1: Каталог растений - Backend
**Story Points:** 5  
**Assignee:** Backend Developer

**Описание:**  
Реализовать API для управления каталогом растений.

**Критерии приёмки:**
- [ ] CRUD endpoints для растений
- [ ] Поиск по названию (рус/лат)
- [ ] Фильтрация по категориям
- [ ] Пагинация результатов
- [ ] Загрузка изображений

**Технические задачи:**
1. Создать модель `Plant` и миграцию
2. Создать `Controllers/PlantsController.cs`
3. Создать `Services/PlantService.cs`
4. Реализовать поиск с использованием Full-Text Search PostgreSQL
5. Добавить загрузку изображений в S3
6. Написать unit и integration тесты

**Схема таблицы:**
```sql
CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    name_ru VARCHAR(200) NOT NULL,
    name_lat VARCHAR(200),
    category VARCHAR(100) NOT NULL,
    family VARCHAR(100),
    description TEXT,
    cultivation_info TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_plants_search ON plants 
USING gin(to_tsvector('russian', name_ru || ' ' || COALESCE(name_lat, '')));
```

**API Endpoints:**
```
GET    /api/v1/plants?search=&category=&page=&limit=
GET    /api/v1/plants/{id}
POST   /api/v1/plants
PUT    /api/v1/plants/{id}
DELETE /api/v1/plants/{id}
POST   /api/v1/plants/{id}/image
```

---

### US-2.2: Каталог растений - Frontend
**Story Points:** 5  
**Assignee:** Frontend Developer

**Описание:**  
Реализовать UI для просмотра и управления каталогом растений.

**Критерии приёмки:**
- [ ] Страница списка растений с карточками
- [ ] Поиск по названию
- [ ] Фильтр по категориям
- [ ] Детальная карточка растения
- [ ] Форма создания/редактирования (admin)

**Технические задачи:**
1. Создать `app/catalog/plants/page.tsx`
2. Создать `app/catalog/plants/[id]/page.tsx`
3. Создать `components/catalog/plant-card.tsx`
4. Создать `components/catalog/plant-detail.tsx`
5. Создать `components/catalog/plant-form.tsx`
6. Добавить компонент загрузки изображений
7. Реализовать infinite scroll или пагинацию

**Макет карточки:**
```
┌─────────────────────────────────┐
│  ┌─────────┐                    │
│  │  IMAGE  │  Томат             │
│  │         │  Solanum lycopersicum
│  └─────────┘                    │
│                                 │
│  Категория: Овощные             │
│  Семейство: Паслёновые          │
│                                 │
│  [Подробнее]                    │
└─────────────────────────────────┘
```

---

### US-2.7: Каталог болезней - Backend
**Story Points:** 5  
**Assignee:** Backend Developer

**Описание:**  
Реализовать API для управления каталогом болезней растений.

**Критерии приёмки:**
- [ ] CRUD endpoints для болезней
- [ ] Связь болезней с растениями (many-to-many)
- [ ] Фильтрация по типу (грибковые, бактериальные, вирусные)
- [ ] Поиск по названию и симптомам

**Технические задачи:**
1. Создать модель `Disease` и миграцию
2. Создать связующую таблицу `plant_diseases`
3. Создать `Controllers/DiseasesController.cs`
4. Создать `Services/DiseaseService.cs`
5. Реализовать связь с растениями
6. Написать тесты

**Схема таблиц:**
```sql
CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    alias VARCHAR(100) UNIQUE NOT NULL,
    pathogen VARCHAR(200),
    type VARCHAR(50) NOT NULL CHECK (type IN ('fungal', 'bacterial', 'viral', 'physiological')),
    symptoms TEXT NOT NULL,
    conditions TEXT,
    prevention TEXT,
    treatment TEXT,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE disease_images (
    id SERIAL PRIMARY KEY,
    disease_id INT REFERENCES diseases(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plant_diseases (
    plant_id INT REFERENCES plants(id) ON DELETE CASCADE,
    disease_id INT REFERENCES diseases(id) ON DELETE CASCADE,
    PRIMARY KEY (plant_id, disease_id)
);
```

---

### US-2.8: Каталог болезней - Frontend
**Story Points:** 5  
**Assignee:** Frontend Developer

**Описание:**  
Реализовать UI для просмотра каталога болезней с детальной информацией.

**Критерии приёмки:**
- [ ] Страница списка болезней
- [ ] Фильтр по типу и severity
- [ ] Детальная карточка болезни
- [ ] Секции: симптомы, лечение, профилактика
- [ ] Галерея изображений
- [ ] Список поражаемых растений

**Технические задачи:**
1. Создать `app/catalog/diseases/page.tsx`
2. Создать `app/catalog/diseases/[id]/page.tsx`
3. Создать `components/catalog/disease-card.tsx`
4. Создать `components/catalog/disease-detail.tsx`
5. Реализовать табы (симптомы, лечение, профилактика)
6. Добавить галерею изображений

**Структура детальной страницы:**
```
┌─────────────────────────────────────────┐
│ < Назад к списку                        │
│                                         │
│ ФИТОФТОРОЗ                              │
│ Phytophthora infestans                  │
│                                         │
│ [Грибковое] [Высокая опасность]         │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [Симптомы] [Лечение] [Профилактика] │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Описание симптомов...                   │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Галерея изображений                 │ │
│ │ [img] [img] [img] [img]             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Поражаемые растения:                    │
│ [Томат] [Картофель] [Перец]             │
└─────────────────────────────────────────┘
```

---

### US-2.11: Каталог вредителей - Backend
**Story Points:** 5  
**Assignee:** Backend Developer

**Описание:**  
Реализовать API для управления каталогом вредителей.

**Критерии приёмки:**
- [ ] CRUD endpoints для вредителей
- [ ] Связь с растениями
- [ ] Фильтрация по типу (насекомые, клещи, нематоды)
- [ ] Поиск по названию

**Схема таблицы:**
```sql
CREATE TABLE pests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    name_lat VARCHAR(200),
    type VARCHAR(50) NOT NULL CHECK (type IN ('insect', 'mite', 'nematode', 'rodent', 'mollusk')),
    lifecycle TEXT,
    damage_symptoms TEXT NOT NULL,
    control_methods TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pest_images (
    id SERIAL PRIMARY KEY,
    pest_id INT REFERENCES pests(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plant_pests (
    plant_id INT REFERENCES plants(id) ON DELETE CASCADE,
    pest_id INT REFERENCES pests(id) ON DELETE CASCADE,
    PRIMARY KEY (plant_id, pest_id)
);
```

---

### US-2.12: Каталог вредителей - Frontend
**Story Points:** 5  
**Assignee:** Frontend Developer

**Описание:**  
Реализовать UI для просмотра каталога вредителей.

**Критерии приёмки:**
- [ ] Страница списка вредителей
- [ ] Фильтр по типу
- [ ] Детальная карточка с жизненным циклом
- [ ] Методы борьбы
- [ ] Галерея изображений

**Технические задачи:**
1. Создать `app/catalog/pests/page.tsx`
2. Создать `app/catalog/pests/[id]/page.tsx`
3. Создать `components/catalog/pest-card.tsx`
4. Создать `components/catalog/pest-detail.tsx`

---

### US-2.14: Связь каталогов
**Story Points:** 5  
**Assignee:** Full-stack Developer

**Описание:**  
Реализовать интерфейс связывания болезней и вредителей с растениями.

**Критерии приёмки:**
- [ ] На карточке растения показываются связанные болезни и вредители
- [ ] На карточке болезни показываются поражаемые растения
- [ ] Возможность добавлять/удалять связи (admin)
- [ ] Быстрая навигация между связанными сущностями

**Технические задачи:**
1. Добавить endpoints для управления связями
2. Реализовать компонент выбора связей
3. Добавить секции на детальных страницах
4. Реализовать навигацию по связям

---

### US-2.15: Загрузка изображений для справочников
**Story Points:** 3  
**Assignee:** Full-stack Developer

**Описание:**  
Реализовать загрузку и управление изображениями для всех справочных сущностей.

**Критерии приёмки:**
- [ ] Drag & drop загрузка
- [ ] Превью перед загрузкой
- [ ] Прогресс загрузки
- [ ] Удаление изображений
- [ ] Оптимизация изображений (resize, compress)

**Технические задачи:**
1. Создать универсальный компонент `ImageUploader`
2. Реализовать backend обработку (Sharp для Node.js или ImageSharp для .NET)
3. Создать миниатюры разных размеров
4. Добавить валидацию типа и размера файла

---

## Seed Data

Подготовить начальные данные для справочников:

**Растения (10+):**
- Томат, Огурец, Перец, Картофель, Капуста
- Пшеница, Ячмень, Кукуруза
- Яблоня, Виноград

**Болезни (15+):**
- Фитофтороз, Мучнистая роса, Серая гниль
- Альтернариоз, Фузариоз, Вертициллёз
- Бактериальный рак, Бактериальное увядание
- Мозаика, Курчавость листьев

**Вредители (10+):**
- Колорадский жук, Тля, Белокрылка
- Паутинный клещ, Трипсы
- Медведка, Проволочник
- Слизни

---

## Definition of Done

- [ ] Все CRUD операции работают корректно
- [ ] Поиск и фильтрация работают быстро (< 200ms)
- [ ] Изображения загружаются и отображаются
- [ ] Mobile-responsive дизайн
- [ ] Unit и integration тесты (coverage > 80%)
- [ ] Seed data загружены
- [ ] Документация API обновлена

---

## Sprint Metrics

| Метрика | План | Факт |
|---------|------|------|
| Story Points | 48 | - |
| User Stories | 9 | - |
| API Endpoints | 18 | - |
| Pages | 6 | - |
