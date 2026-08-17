# Progress log

Найновіші записи зверху. Формат:

```
## YYYY-MM-DD — <коротка назва>
- Задача:
- Зроблено:
- Перевірка:
- Memory bank:
- Далі:
```

---

## 2026-08-18 — Wick iframe + Save/Load

- Задача: `docs/tasks/2026-08-18-wick-save-load.md`
- Зроблено: міст у форку; vendor `gh-pages` → `/editor`; EditorHost + API file/save; cloud save лише після load.
- Перевірка: `npm run lint` OK, `npm run typecheck` OK, `npm run build` OK.
- Memory bank: active, tech.
- Далі: пуш; ключі Supabase; ручний тест Save/Load.

---

## 2026-08-18 — форк Wick Editor

- Задача: `docs/tasks/2026-08-18-wick-editor-fork.md`
- Зроблено: https://github.com/balelkin/wick-editor від Wicklets/wick-editor, default branch only, SHA `f34f0d9512d7165e74c1910ea1aba9173ab8dec2`.
- Перевірка: `gh repo view` isFork=true, parent=Wicklets/wick-editor, GPL-3.0.
- Memory bank: ADR-007, tech, active.
- Далі: міст Save/Load у форку; білд `/editor` у порталі. Не auto-merge upstream.

---

## 2026-08-18 — без технічних підказок у UI

- Задача: прибрати з екранів згадки про непідключену БД / `.env`.
- Зроблено: жовті банери знято; якщо сервіс недоступний — нейтральне «спробуй пізніше».
- Перевірка: підказки `supabase/README` і `.env.local` більше не в словниках UI.
- Memory bank: active.
- Далі: ключі Supabase в Vercel; форк Wick.

---

## 2026-08-18 — push GitHub + Vercel

- Задача: опублікувати MVP на `balelkin/wickworld` і задеплоїти.
- Зроблено: коміт порталу, `origin` → `git@github.com:balelkin/wickworld.git`, production Vercel, GitHub підключено.
- Перевірка: push `main` OK; Vercel build OK; alias `https://wickworld.vercel.app`.
- Memory bank: tech (репо), active (деплой).
- Далі: ключі Supabase в Vercel Env + SQL; потім форк Wick.

---

## 2026-08-17 — Auth + CRUD проєктів

- Задача: `docs/tasks/2026-08-17-auth-and-projects.md`
- Зроблено: SQL (profiles, projects, RLS, bucket), cookies-сесія, реєстрація/вхід/вихід, список/створення/перейменування/видалення, ліміт 20, i18n форм. Файл `.wick` не завантажується.
- Перевірка: `npm run lint` OK, `npm run typecheck` OK, `npm run build` OK без ключів Supabase.
- Memory bank: active, tech, progress.
- Далі: людина налаштовує Supabase dashboard; наступна задача — форк Wick + Save/Load.

---

## 2026-08-17 — i18n + адаптив

- Задача: `docs/tasks/2026-08-17-i18n-responsive.md`
- Зроблено: next-intl uk/en, `[locale]` routes, мобільне меню, словники всіх поточних екранів.
- Перевірка: `npm run lint` OK, `npm run build` OK (proxy/middleware у білді).
- Memory bank: ADR-006, tech, active.
- Далі: fork Wick або Auth.

---

## 2026-08-17 — фундамент Next.js

- Задача: `docs/tasks/2026-08-17-nextjs-foundation.md`
- Зроблено: Next.js 16, шари app/modules/shared, типи протоколу Wick, каркас сторінок, лендінг-каркас.
- Перевірка: `npm run lint` OK, `npm run build` OK (7 маршрутів).
- Memory bank: tech, patterns, decisions ADR-005, active.
- Далі: fork Wick або Supabase Auth — після окремої задачі.

---

## 2026-08-17 — процес агентів і MVP spec

- Задача: підготувати специфікацію, memory bank і правила для всіх агентів (без коду продукту).
- Зроблено:
  - `AGENTS.md`, `.cursor/rules/`, skill `wickworld-workflow`
  - memory bank (brief, product, tech, patterns, active, decisions)
  - шаблон задач `docs/tasks/_TEMPLATE.md`
  - spec `docs/specs/2026-08-17-wickworld-mvp-design.md`
- Перевірка: імплементації Wick/Next.js не починали; інваріанти з плану перенесені в spec і rules.
- Memory bank: створено з нуля.
- Далі: людина ревʼю spec; після «ок» — перша задача етапу 1 (fork Wick + Save/Load) через `docs/tasks/`.
