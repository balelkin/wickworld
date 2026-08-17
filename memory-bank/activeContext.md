# Active context

**Дата оновлення:** 2026-08-17

**Фаза:** етап 1 — Auth і кабінет проєктів (без Wick).

**Зараз:**

- Next.js 16, модулі, next-intl (`uk` default, `en` з префіксом).
- Supabase Auth (email+пароль) + CRUD проєктів: SQL, RLS, cookies, захист `/projects`.
- Сторінки: `/`, `/login`, `/register`, `/projects`, `/projects/[id]/edit` (заглушка редактора).
- Без `.env.local` застосунок збирається; форми показують «не налаштовано».

**Далі:** людина створює проєкт Supabase (див. `supabase/README.md`). Потім форк Wick + Save/Load.

**Блокери:** локальний Auth не працює, поки немає URL + anon key у `.env.local` і виконаного SQL.

