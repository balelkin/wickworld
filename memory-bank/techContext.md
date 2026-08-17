# Tech context

## Репозиторії

- `balelkin/wickworld` — цей репо, портал (https://github.com/balelkin/wickworld).
- `gromko/wick-editor` — ще не створений. Форк https://github.com/Wicklets/wick-editor (GPL v3). Upstream не auto-merge.

## Стек порталу

- Next.js 16 App Router, React 19, TypeScript (`strict`, `noUncheckedIndexedAccess`)
- Tailwind 4
- Zod (env), Result-тип для інфри
- `@supabase/ssr` + `@supabase/supabase-js` (сесія в cookies; ключі опційні для білду)
- Схема: `supabase/migrations/20260817120000_init.sql` (profiles, projects, RLS, bucket `projects`)
- Object key: `{userId}/{projectId}.wick` (рядок у Postgres є; файл у Storage — після Wick)
- UI мова: українська (default) + англійська (`/en`)
- i18n: next-intl, словники `src/messages/{uk,en}.json`
- Запуск: `npm run dev` → http://localhost:3000

## Стек Wick (форк)

- Create React App, React 16, react-scripts 2.0.5, node-sass 4
- Збірка окремо (`npm run build`), віддача як статика `/editor`
- Платформний хук: `src/files/filehandler.js` → `window.saveFileFromWick`
- Формат файлу: `.wick` = zip + `project.json` + assets

Не вставляти Wick у Next як залежність. Фіксувати версію Node для білду Wick (орієнтир 14/16), не гнатися за latest.

## Ліміти MVP (чернетка)

- Файл: до 25 MB
- Проєктів на учня: до 20

## Код порталу

```
src/app          маршрути
src/modules      auth, projects, editor, marketing
src/shared       ui, config, lib, types
```

Макет HTML лишився в `wickworld.html` (референс). Hero-картинка: `public/images/wwimage.png`.

## Секрети

Не комітити `.env.local`. Шаблон: `.env.example`.
