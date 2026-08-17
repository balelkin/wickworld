# Auth і проєкти (без Wick)

**Статус:** approved  
**Дата:** 2026-08-17  
**Доповнює:** MVP spec §5–6

## Auth

- Email + пароль. Сесія — cookies (`@supabase/ssr`).
- `/projects` і `/projects/[id]/edit` лише для власника.
- Гость на ці шляхи → `/login`. Залогінений на `/login` чи `/register` → `/projects`.
- Без env Supabase застосунок не падає: форми показують «не налаштовано».

## Дані

- `profiles.id` = `auth.users.id`, `display_name`, `created_at`
- `projects`: id, user_id, title, storage_path, visibility default `private`, remix_of null, timestamps
- Object key у бакеті `projects`: `{userId}/{projectId}.wick` (колонка `storage_path`)
- Файл на диску Storage **не створюємо**, поки немає Wick. Рядок у Postgres — так.

## Ліміти

- Не більше 20 проєктів на user_id (перевірка в server action + RLS не замінює її)

## Не входить

Wick iframe, upload `.wick`, публічні проєкти, ремікс.
