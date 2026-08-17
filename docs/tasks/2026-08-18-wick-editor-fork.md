# Задача: Форк Wick Editor

**Дата:** 2026-08-18  
**Статус:** done  
**Spec:** `docs/specs/2026-08-17-wickworld-mvp-design.md` §3, ADR-002  
**Етап:** 1 MVP

## Мета

Мати власну копію Wick Editor на GitHub, щоб потім зібрати статику `/editor` і підключити Save/Load.

## Входить

- Форк `Wicklets/wick-editor` → `balelkin/wick-editor`
- Пінований коміт upstream, без auto-merge

## Не входить

- Міст `saveFileFromWick` / postMessage
- Білд і деплой `/editor` у порталі
- Зміни ядра Wick

## Критерій готовності

- Репо `https://github.com/balelkin/wick-editor` існує як форк
- SHA upstream записаний у memory bank

## Погодження

- [x] Людина попросила створити форк на її GitHub
