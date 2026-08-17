# Задача: Wick iframe + Save/Load

**Дата:** 2026-08-18  
**Статус:** done  
**Spec:** `docs/specs/2026-08-18-wick-save-load.md`  
**Етап:** 1 MVP

## Мета

Учень малює в нашому Wick на `/projects/{id}/edit`, Save йде в хмару, після refresh малюнок на місці.

## Входить

- Міст у форку: `window.saveFileFromWick` + `postMessage`
- Статичний білд редактора, віддача з `/editor` того ж домену
- Iframe-хост у порталі
- GET/POST файлу проєкту (власник, ліміт 25 MB)
- Cloud Save лише після успішного Load / load-empty

## Не входить

- Перепис ядра Wick
- Iframe wickeditor.com
- Галерея, ремікс, «показати вчителю»
- Auto-merge upstream
- Автозбереження в хмару

## Файли

- Форк `balelkin/wick-editor` (міст)
- Портал: `src/modules/editor/*`, API save/load, `public/editor` (збірка)
- Memory bank: progress, active, tech

## Критерій готовності

- Відкрити проєкт → Wick у iframe, не wickeditor.com
- Save не качає файл на диск
- Hard refresh відновлює малюнок (коли є Supabase)
- Без ключів портал не падає

## Погодження

- [x] Архітектура вже в MVP spec §3–4 і ADR-002
- [x] Людина сказала «робимо»
