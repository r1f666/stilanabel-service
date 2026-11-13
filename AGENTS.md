# AGENTS.md — СтиланаБел Сервис

Проект: статический сайт сервисного центра по заправке картриджей и ремонту принтеров в Минске.
Домен: `service.stilanabel.by`

---

## Структура проекта

```
├── .github/workflows/pages.yml   # GitHub Actions: сборка Jekyll → GitHub Pages (ветка main)
├── .gitignore
├── wrangler.toml                 # Cloudflare Pages (альтернативный деплой)
├── docs/
│   ├── index.html                # Главная страница (статический HTML, без Jekyll)
│   ├── 404.html                  # Страница 404
│   ├── sitemap.xml               # Карта сайта для поисковиков
│   ├── llms.txt                  # Описание сайта для AI-агентов
│   ├── favicon.svg               # Фавикон (CMYK-квадрат 4 цвета)
│   ├── site.webmanifest          # PWA-манифест
│   ├── css/
│   │   └── style.css             # Все стили (один файл, ~235 строк)
│   ├── js/
│   │   └── main.js               # Год в футере + цели аналитики (YM/GA4)
│   ├── img/
│   │   ├── printer.webp          # Изображение для статьи о полосах
│   │   ├── og-image.png          # Open Graph изображение (1200×630)
│   │   └── apple-touch-icon.png  # Иконка для iOS
│   ├── _layouts/
│   │   ├── default.html          # Базовый шаблон (хедер, футер, хлебные крошки, док-навигация)
│   │   └── post.html             # Шаблон для статей блога
│   ├── _posts/                   # Статьи блога (Jekyll posts)
│   │   ├── 2026-11-03-chistka-printera.md
│   │   └── 2026-11-12-printer-privychki.md
│   └── blog/
│       └── index.html            # Страница каталога блога
```

---

## Технологии

- **Jekyll** — генератор статических сайтов (обработка `_posts/`, `_layouts/`)
- **GitHub Pages** — основной хостинг (ветка `main` → `pages.yml` → `_site` → GitHub Pages)
- **Cloudflare Pages** — альтернативный деплой (`wrangler.toml`, директория `./public`)
- **Чистый HTML/CSS/JS** — без фреймворков, без сборщиков
- **Шрифты**: Onest (основной) + Unbounded (заголовки) через Google Fonts

---

## Ключевые файлы

### `docs/index.html` — Главная страница
- Статический HTML (не через Jekyll-шаблон)
- Секции: Hero → Факты → Услуги → Цены → Как работаем → Бренды → Отзывы → Контакты
- Schema.org JSON-LD (LocalBusiness)
- Яндекс.Метрика (ID: 113988087) + Google Analytics (G-ZDEPBV5P3Z)
- Яндекс.Верификация: `476ba1ee6f1ee7ed`
- `data-goal` атрибуты на кнопках для целей аналитики

### `docs/_layouts/default.html` — Базовый шаблон
- Общий хедер (логотип, навигация, телефон)
- Хлебные крошки: `<nav class="breadcrumbs">` с `<div class="wrap">` — **обёртка обязательна**
- Футер (ООО «СтиланаБел», УНП, ссылка на интернет-магазин)
- Док-навигация (мобильная панель: Позвонить / Viber / Telegram)
- Open Graph: для `post` — `og:type: article`, иначе `website`

### `docs/_layouts/post.html` — Шаблон статьи
- Обёртка `<article class="post">` с хедером (дата, заголовок, описание) и футером (ссылка на блог)
- Контент статьи в `{{ content }}`

### `docs/blog/index.html` — Каталог блога
- Выводит последние 10 статей: `{% for post in site.posts limit: 10 %}`
- **Важно**: `site.posts` уже отсортирован от новых к старым (НЕ нужно `| reverse`)
- Карточки: дата, заголовок, описание, ссылка «Читать далее»

### `docs/css/style.css` — Стили
- CSS-переменные в `:root` (цвета, шрифты, радиусы)
- Компоненты: `.wrap`, `.btn`, `.hero`, `.facts`, `.section`, `.item`, `.prices`, `.steps`, `.brands`, `.contact`, `.dock`, `.breadcrumbs`, `.blog-list`, `.blog-card`, `.post`
- Адаптив: `900px` и `620px` брейкпоинты
- Мобильная док-навигация появляется на `≤620px`
- `prefers-reduced-motion` — отключение анимаций

### `docs/js/main.js` — Скрипт
- Автообновление года в футере
- Отправка целей в Яндекс.Метрику и GA4 по клику на `[data-goal]` элементы
- `YM_ID = 0` — нужно заменить на реальный ID для работы Метрики

### `wrangler.toml` — Cloudflare Pages
```toml
name = "stilanabel-service"
compatibility_date = "2024-03-20"
[assets]
directory = "./public"
[[routes]]
pattern = "service.stilanabel.by/*"
zone_name = "stilanabel.by"
```

### `.github/workflows/pages.yml` — GitHub Actions
- Триггер: push в `main` или `workflow_dispatch`
- Сборка: `bundle exec jekyll build --trace -d ../_site`
- Деплой: GitHub Pages (actions/deploy-pages@v4)

---

## Статьи блога

### Формат поста (`.md` в `docs/_posts/`)
```yaml
---
layout: post
title: "Заголовок статьи"
date: YYYY-MM-DD
description: "Описание для сниппета и OG"
breadcrumbs:
  - text: Главная
    url: /
  - text: Блог
    url: /blog/
  - text: Заголовок статьи
---
```

### Правила именования файлов
- Формат: `YYYY-MM-DD-kratkoe-nazvanie.md`
- Разделитель: дефис `-`
- Строчные буквы, кириллица допустима

### Текущие статьи
1. `2026-11-03-chistka-printera.md` — «Почему принтер печатает с полосами…»
2. `2026-11-12-printer-privychki.md` — «Принтер в офисе: 5 привычек…»

### Структура контента статьи
- Вводный абзац (контекст + авторитет «Мы в «СтиланаБел»…»)
- Заголовки `##` для разделов
- **Что делать:** — жирный текст + совет
- Чек-листы через `- [ ]`
- CTA в конце (призыв к действию)
- Изображения: `![alt](/img/filename.webp)`

---

## SEO и мета-данные

### Главная страница (`index.html`)
- Title: «Заправка картриджей и ремонт принтеров в Минске — выезд в офис | СтиланаБел»
- Description: «Заправка картриджей от 22 BYN и ремонт принтеров от 35 BYN…»
- Canonical: `https://service.stilanabel.by/`
- OG: 1200×630, `og-image.png`
- JSON-LD: LocalBusiness (телефон, email, цены, foundingDate: 2016)

### Статьи (`_layouts/default.html` для `layout: post`)
- OG type: `article`
- `article:published_time` из `page.date`
- Canonical: `{{ site.url }}{{ page.url }}`

### sitemap.xml
- Ручное обновление при добавлении статей
- URL-формат: `https://service.stilanabel.by/YYYY/MM/DD/filename.html`
- Приоритет: главная 1.0, статьи 0.6, блог 0.5

### llms.txt
- Описание компании, услуг, цен
- Ссылки на все страницы сайта
- Список статей блога с описаниями

---

## Контакты и данные компании

- **Название**: ООО «СтиланаБел»
- **УНП**: 192626415
- **Регистрация**: Мингорисполком, 29.03.2016
- **С**: 2016 года
- **Телефон**: +375 44 783-37-25
- **Email**: info@stilanabel.by
- **Viber**: viber://chat?number=%2B375447833725
- **Telegram**: https://t.me/StilanaBel
- **Город**: Минск
- **Сопутствующий сайт**: https://stilanabel.by/ (интернет-магазин)

---

## Цены

| Услуга | Цена с НДС |
|--------|-----------|
| Заправка ч/б картриджа | от 22 BYN |
| Заправка цветного картриджа | от 30 BYN |
| Диагностика и ремонт | от 35 BYN |
| Каждая 7-я заправка (для организаций) | бесплатно |

---

## Бренды техники

HP, Canon, Brother, Samsung, Epson, Kyocera, Xerox, Ricoh

---

## Правила работы с проектом

### Добавление новой статьи
1. Создать файл `docs/_posts/YYYY-MM-DD-kratkoe-nazvanie.md`
2. Заполнить YAML-фронтматтер (`layout`, `title`, `date`, `description`, `breadcrumbs`)
3. Написать контент: вводный абзац, разделы `##`, советы, CTA
4. Обновить `docs/sitemap.xml` (добавить URL статьи)
5. Обновить `docs/llms.txt` (добавить ссылку в раздел «Блог»)
6. Коммит и push

### Изменение стилей
- Править только `docs/css/style.css`
- CSS-переменные в `:root` — менять цвета/радиусы там
- Адаптив через `@media` (900px, 620px)

### Изменение шаблонных блоков
- Хедер/футер/навигация: `docs/_layouts/default.html`
- Структура главной: `docs/index.html`
- Каталог блога: `docs/blog/index.html`

### Деплой
- **GitHub Pages**: push в `main` → авто-сборка через `pages.yml`
- **Cloudflare**: `wrangler pages deploy docs/` (требует `./public` — нужна переадресация)

---

## Важные замечания

1. **Хлебные крошки** — всегда оборачивать в `<div class="wrap">` внутри `.breadcrumbs` (выравнивание по центру)
2. **Сортировка статей** — `site.posts` уже отсортирован от новых к старым, `| reverse` НЕ нужен
3. **Изображения** — пути относительные `/img/...` (корень сайта)
4. **Аналитика** — `YM_ID = 0` в `main.js` нужно заменить на реальный ID
5. **Язык** — `lang="ru"` на всех страницах
6. **Посты** — не используют `excerpt` из Jekyll, описание берётся из фронтматтера `description`
