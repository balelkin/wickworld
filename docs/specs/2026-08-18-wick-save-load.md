# Wick Save/Load (міст + `/editor`)

**Статус:** approved (у межах MVP spec §3–4; людина сказала робити)  
**Дата:** 2026-08-18  
**Доповнює:** `docs/specs/2026-08-17-wickworld-mvp-design.md`

## Розділення

| Що | Де |
|----|-----|
| GPL-вихідники Wick + міст | `balelkin/wick-editor` |
| Статична збірка | портал віддає `/editor/*` (копія білду, з текстом GPL) |
| Хост, API, Auth | `balelkin/wickworld` |

Wick не імпортується як npm у Next.

## Міст (форк)

До старту React:

- якщо немає `window.saveFileFromWick` — ставимо свою функцію, яка шле `wickworld:save` батьку і чекає `wickworld:save-ack`
- `window.wickEditorFileSystemType = "cloud"`

Load: після `wickworld:ready` батько шле `load` (байти) або `load-empty`. Iframe імпортує через існуючий API Wick (`importProjectAsWickFile` / еквівалент). Успіх → прапорець «load ok»; без нього Save в хмару не ack-иться як ok.

Origin: лише `event.origin === window.location.origin`.

## Портал

- `EditorHost`: iframe `src="/editor/?projectId=…"`
- `GET /api/projects/[id]/file` — `.wick` власнику; 404 якщо файлу ще немає (тоді load-empty)
- `POST /api/projects/[id]/save` — тіло bytes, max 25 MB, лише власник
- Storage key як у схемі: `{userId}/{projectId}.wick` у бакеті `projects`

## Не входить

Ядро Wick, галерея, autosave в хмару, wickeditor.com.
