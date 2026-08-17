**Дата оновлення:** 2026-08-18

**Фаза:** етап 1 — iframe Wick на `/editor`, Save/Load API є; хмара чекає ключі Supabase.

**Зараз:**

- Форк: https://github.com/balelkin/wick-editor (міст `wickworld-bridge.js`).
- Портал віддає статику `/editor` (vendor з Wick `gh-pages` + міст).
- `GET/POST /api/projects/[id]/file|save`. Cloud Save лише після Load.
- Auth на проді все ще потребує ключів Vercel.

**Далі:** пуш порталу; ключі Supabase; ручний цикл намалював → Save → refresh.

**Деплой:** https://wickworld.vercel.app

