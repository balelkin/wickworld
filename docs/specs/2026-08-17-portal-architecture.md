# Портал WickWorld — архітектура коду

**Статус:** approved (імплементація етапу 1, фундамент)  
**Дата:** 2026-08-17  
**Доповнює:** `docs/specs/2026-08-17-wickworld-mvp-design.md`

## Шари (залежності лише вниз)

```
src/app          → маршрути, layouts, Route Handlers
src/modules/*    → фічі (auth, projects, editor, marketing)
src/shared       → UI, lib, типи, config
```

- `app` може імпортувати `modules` і `shared`.
- Модуль імпортує лише `shared` і **свій** код. Інший модуль — тільки через `@/modules/<name>` (public API).
- `shared` не імпортує `modules` і `app`.

## Public API модуля

Кожен модуль експортує з `index.ts` типи, компоненти й функції, дозволені зовні. Внутрішні файли (`components/`, `lib/`, `server/`) з інших модулів не імпортуємо.

## Патерни

- Server Components за замовчуванням; `"use client"` лише для інтерактиву.
- Доменні типи в модулі (`ProjectId`, `UserId`) — branded `string`, не «голий» `string` у публічних сигнатурах.
- Помилки інфраструктури: `Result<T, E>` у `shared/lib/result.ts`, не `throw` крізь UI.
- Env: Zod. Без валідних Supabase ключів застосунок стартує, клієнт БД не створюється.
- Імена: компоненти PascalCase, файли компонентів PascalCase, утиліти camelCase.
- Рядки UI: `src/messages/{uk,en}.json` + next-intl. Навігація через `@/i18n/navigation`.
- Адаптив: mobile-first, меню-гамбургер < `md`, touch-target ≥ 44px.

## Маршрути (етап 1)

Префікс локалі: `uk` без префікса, `en` → `/en/…`.

| Шлях | Модуль | Стан фундаменту |
|------|--------|-----------------|
| `/` | marketing | каркас лендінгу |
| `/login`, `/register` | auth | заглушки форм |
| `/projects` | projects | заглушка списку |
| `/projects/[id]/edit` | editor | заглушка iframe-хоста |

API routes зʼявляться в задачі Storage, не в фундаменті.

## Що не класти в Next

Wick Editor (форк) лишається окремим додатком. У фундаменті лише типи повідомлень і порожній host.
