# Задача: Фікс шляхів Wick на `/editor`

**Дата:** 2026-08-18  
**Статус:** done  
**Spec:** `docs/specs/2026-08-18-wick-save-load.md`  
**Етап:** 1 MVP

## Мета

Відкрити редактор і побачити UI Wick, не лише прелоадер-морду.

## Входить

- Абсолютні URL асетів `/editor/...` у vendored `index.html`
- Iframe на `/editor/index.html`, щоб відносні шляхи не ламались

## Не входить

- Перебудова Wick з CRA
- Supabase

## Критерій готовності

- `https://wickworld.vercel.app/editor` підвантажує `/editor/static/js/main.*.chunk.js` (200)
- У вікні є меню Wick, не лише логотип
