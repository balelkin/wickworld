# WickWorld MVP — специфікація

**Статус:** waiting-approval  
**Дата:** 2026-08-17  
**Етап:** 1 (MVP для уроків)  
**План для команди:** `docs/wickworld-plan.md`  
**Рішення:** `memory-bank/decisions.md`

Цей документ — джерело правди для імплементації етапу 1. Етапи 2–3 тут лише як межі scope, без вимог до коду.

---

## 1. Мета

Учень (9–16 років) може зареєструватися, створити проєкт, малювати в Wick Editor на нашому сайті і зберігати роботу в хмарі. Після перезавантаження браузера проєкт відкривається з того самого стану.

Якщо цикл Load → Edit → Save → Reload не відтворює малюнок — MVP не готовий.

## 2. Користувач і сценарії

**Актор етапу 1:** учень з email і паролем.

**Успішний сценарій**

1. Реєстрація / вхід.
2. Список «Мої проєкти» (порожній або з картками).
3. «Створити проєкт» → порожній Wick у `/projects/{id}/edit`.
4. Малює, натискає Save в редакторі → файл у Supabase, не download на диск.
5. Закриває вкладку, відкриває той самий проєкт → малюнок на місці.
6. Може перейменувати або видалити проєкт зі списку.

**Поза scope етапу 1:** публічна галерея, ремікс, коментарі, курси, кабінет вчителя, модерація, Google/код вчителя (поки команда не вирішить інакше), автозбереження в хмару.

**Компроміс для уроку:** посилання «Показати вчителю» — read-only перегляд або download `.wick`, без обліковки вчителя. Реалізувати після стабільного Save/Load, не блокує 1.1–1.3.

## 3. Архітектура

Два репозиторії:

| Репо | Роль | Ліцензія |
|------|------|----------|
| `balelkin/wickworld` | Next.js портал, API, деплой Vercel | наша (не GPL обовʼязково) |
| `balelkin/wick-editor` | форк Wicklets/wick-editor + міст | GPL v3 |

Офіційний Wick — тільки upstream. Пінимо коміт. Оновлення ручні.

Портал віддає зібраний редактор з `/editor/*`. Сторінка `/projects/[id]/edit` тримає iframe `src="/editor?projectId=…"`. Обмін — `postMessage`, origin = наш сайт.

Wick не є npm-залежністю Next.js.

## 4. Контракт Save / Load

### 4.1 Міст у форку (до старту React редактора)

Підмінити лише якщо ще не задано платформою:

- `window.saveFileFromWick(file, name, extension, success, failure)`
- `window.wickEditorFileSystemType = "cloud"`

Не чіпати ядро timeline / engine. Не хакати кнопку в DOM.

### 4.2 Повідомлення (чернетка протоколу)

Батько → iframe:

- `{ type: "wickworld:load", requestId, wickBytes }` — ArrayBuffer або Blob URL того ж origin
- `{ type: "wickworld:load-empty", requestId }` — новий проєкт

Iframe → батько:

- `{ type: "wickworld:ready" }`
- `{ type: "wickworld:save", requestId, file: ArrayBuffer, name, extension }`
- `{ type: "wickworld:save-result" }` не шле iframe; батько викликає success/failure через відповідь:
- `{ type: "wickworld:save-ack", requestId, ok, error? }`

Ігнорувати `event.origin !== window.location.origin`.

Точні імена полів можна уточнити в задачі мосту, але напрям (typed messages + requestId + ack) фіксований.

### 4.3 Правила

- Cloud Save заборонений, поки Load (або load-empty для нового проєкту) не завершився успішно.
- Невдалий upload не викликає success у Wick.
- Ліміт файлу 25 MB: відхилити до запису в Storage.
- Autosave Wick у localForage не замінює хмару і не перезаписує хмарний файл без явного Save.

## 5. Дані

**profiles:** `id` (PK = auth.users.id), `display_name`, `created_at`.

**projects:** `id`, `user_id`, `title`, `storage_path`, `visibility` default `private`, `remix_of` null, `created_at`, `updated_at`.

**Storage:** bucket `projects`, ключ `projects/{userId}/{projectId}.wick`.

**RLS етап 1:** select/insert/update/delete своїх рядків; Storage — лише свій префікс `{userId}/`.

**Auth за замовчуванням:** email + пароль (Supabase). Інші провайдери — окреме рішення в `decisions.md`.

**Ліміт:** не більше 20 проєктів на `user_id`.

## 6. API порталу (мінімум)

| Метод | Шлях | Поведінка |
|-------|------|-----------|
| — | сторінки Next | `/login`, `/register`, `/projects`, `/projects/[id]/edit` |
| POST | `/api/projects` | створити рядок + порожній або шаблонний .wick |
| PATCH | `/api/projects/[id]` | title |
| DELETE | `/api/projects/[id]` | рядок + обʼєкт Storage |
| GET | `/api/projects/[id]/file` | віддати .wick власнику |
| POST | `/api/projects/[id]/save` | multipart/body bytes, перевірка власника, розміру, load-complete на клієнті |

Точний shape JSON — у задачі API; семантика таблиці фіксована.

## 7. Порядок реалізації (етап 1)

1. Fork Wick, міст, перевірка циклу на мінімальному host (можна ще без повного кабінету).
2. Next.js + Supabase + Auth.
3. CRUD проєктів + Storage + RLS.
4. Сторінка редактора з iframe на продакшен-шляху `/editor`.
5. Ліміти, деплой Vercel.
6. Перенос макету головної — після робочого кабінету, не блокує Save/Load.
7. «Показати вчителю» — опційно в кінці етапу 1.

## 8. Не робити

- Iframe `wickeditor.com`
- Перепис Wick UI / engine
- Змішувати GPL-вихідники Wick у бандл Next
- Auto-merge upstream
- Галерея, ремікс, уроки, вчительський кабінет
- Коміти секретів

## 9. Перевірка MVP

Ручний сценарій (обовʼязковий):

1. Новий користувач реєструється.
2. Створює проєкт, малює унікальну фігуру, Save, бачить успіх, **немає** діалогу «зберегти файл на диск».
3. Hard refresh → фігура на місці.
4. Вийти / зайти з іншого браузера (або інкогніто) → фігура на місці.
5. Другий користувач не відкриває URL чужого `/projects/{id}/edit` (403 / редірект).
6. Файл > 25 MB — помилка, старий .wick не зіпсований.

## 10. Відкриті продуктові питання

Не блокують пункти 7.1–7.5. Не вигадувати в коді іншу відповідь без ADR:

- OAuth / код вчителя замість email
- Чи обовʼязкове «показати вчителю» в етапі 1
- Прод-домен
- Хто модерує і хто пише уроки (етапи 2–3)
