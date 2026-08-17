---
name: wickworld-workflow
description: >-
  WickWorld agent workflow: describe the task, agree the spec, implement,
  write the progress log, update the memory bank. Use at the start of every
  WickWorld session, before any code, when planning features, debugging, or
  handing off to another agent.
---

# WickWorld workflow

Обовʼязково на старті сесії, **до** будь-якого коду.

## 1. Завантажити контекст

Прочитай (у цьому порядку):

1. `AGENTS.md`
2. `memory-bank/activeContext.md`
3. `memory-bank/progress.md`
4. Spec задачі в `docs/specs/` (для MVP: `docs/specs/2026-08-17-wickworld-mvp-design.md`)

Оголоси коротко: поточний етап, активна задача, блокери.

## 2. Описати задачу

Створи або онови `docs/tasks/YYYY-MM-DD-<slug>.md` за `docs/tasks/_TEMPLATE.md`.

У відповіді людині:

- мета (1 речення)
- що входить / не входить
- які файли зміняться
- критерій готовності
- що треба погодити

**Стоп.** Не пиши код, поки людина не сказала «ок» / «роби».

## 3. Специфікація

Якщо задача змінює поведінку, API, схему або інтеграцію Wick:

- онови існуючу spec або додай нову в `docs/specs/`
- розбіжності з `docs/wickworld-plan.md` запиши в `memory-bank/decisions.md`

Знову **стоп**, якщо це не тривіальний багфікс у межах уже погодженої spec.

## 4. Реалізація

Лише погоджений обсяг. Після змін:

- перевір критерій готовності з task-файлу
- не стверджуй «готово» без перевірки

## 5. Закрити хід

1. Додай запис у `memory-bank/progress.md` (дата, задача, зроблено, перевірка, далі).
2. Онови `memory-bank/activeContext.md`.
3. Нові факти / рішення — `decisions.md`, `techContext.md`, `systemPatterns.md`.
