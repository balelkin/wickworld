# Задача: фундамент Next.js і модульна архітектура порталу

**Дата:** 2026-08-17  
**Статус:** done  
**Spec:** `docs/specs/2026-08-17-portal-architecture.md` + MVP spec  
**Етап:** 1 MVP

## Мета

Підняти Next.js у цьому репо і закласти шари (app / modules / shared), типи та каркас сторінок етапу 1 — без реальної Auth, Storage і Wick.

## Входить

- Next.js App Router, TypeScript, Tailwind, ESLint
- Модулі: `auth`, `projects`, `editor`, `marketing`
- Shared: UI, env, result, supabase-клієнти (без обовʼязкового ключа на старті)
- Маршрути-заглушки: `/`, `/login`, `/register`, `/projects`, `/projects/[id]/edit`
- Доменні типи з MVP spec
- Перенос hero-картинки в `public/`

## Не входить

- Fork Wick, postMessage-міст, реальний Save/Load
- Підключений Supabase проєкт / міграції / RLS
- Повний паритет HTML-макета (тости, фейкові ряди) — лише каркас компонентів
- Деплой Vercel

## Файли

- Створити: `package.json`, `src/**`, `public/images/`, spec архітектури
- Залишити: `wickworld.html` як референс макета
- Memory bank: tech, patterns, active, progress, decisions

## Критерій готовності

- `npm run build` проходить
- Імпорти модулів ідуть через public API (`@/modules/<name>`)
- Сторінки відкриваються без crash без `.env`

## Погодження

- [x] Людина сказала починати з бази Next.js
