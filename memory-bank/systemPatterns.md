# System patterns

## Два процеси, один домен

```
Браузер
  Next.js (/projects/[id]/edit)  --iframe-->  /editor (статичний Wick)
                     ^                         |
                     +----- postMessage -------+
Next.js API  -->  Supabase Auth / Postgres / Storage
```

## Save

1. Учень Save у Wick.
2. Wick збирає Blob `.wick`.
3. `window.saveFileFromWick` (наш міст, не file-saver download).
4. `postMessage` батьківському вікну.
5. `POST /api/projects/[id]/save` → Storage `projects/{userId}/{projectId}.wick` + `updated_at`.
6. Відповідь ok → Wick success callback. Інакше failure, файл у хмарі не затираємо напівзаписом.

## Load

1. Сторінка редактора тягне `.wick` (підписаний URL або через API).
2. `postMessage` в iframe.
3. Існуючий імпорт Wick (`importProjectAsWickFile`).
4. Прапорець «load успішний» → лише тоді дозволений cloud Save.

## Ізоляція GPL

Портал і редактор — різні програми, звʼязок повідомленнями. Форк Wick лишається GPL. Портал не змішувати з вихідниками Wick в одному бандлі.

## Шари TypeScript

`app` імпортує `modules` і `shared`. Модуль — лише `shared` + свій public `index.ts`. ESLint блокує `@/modules/<name>/internal` ззовні модуля.

Доменні ID — branded `UserId` / `ProjectId`. Інфра-помилки — `Result<T, E>`, не throw у UI.

## Дані MVP

- `profiles`: id → auth.users, display_name, created_at
- `projects`: id, user_id, title, storage_path, visibility (default private), remix_of nullable, timestamps
- RLS: рядок і файл бачить лише власник (етап 1)
