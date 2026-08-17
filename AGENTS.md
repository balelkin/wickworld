# WickWorld — правила для агентів

Це обовʼязковий процес. Код без погодженої задачі і специфікації не пишемо.

## Перед будь-якою роботою

1. Прочитай `memory-bank/activeContext.md` і `memory-bank/progress.md`.
2. Прочитай релевантну специфікацію в `docs/specs/`.
3. Якщо контекст суперечить коду — довіряй spec + memory bank, потім уточни в людини.

## Цикл задачі (жорсткий порядок)

1. **Описати задачу** → новий файл `docs/tasks/YYYY-MM-DD-<slug>.md` за шаблоном `docs/tasks/_TEMPLATE.md`. Показати людині. **Стоп.**
2. **Погодити специфікацію** → оновити або створити `docs/specs/…`. Якщо змінює архітектуру — чекати явного «ок». **Стоп, поки немає ок.**
3. **Реалізувати** лише те, що в погодженій spec / task. Без scope creep.
4. **Прогрес-лог** → додати запис у `memory-bank/progress.md` (що зроблено, що зламалось, що далі).
5. **Memory bank** → оновити `activeContext.md`; рішення — у `memory-bank/decisions.md`; сталі факти — у brief / tech / patterns.

## Заборонено

- Починати імплементацію в тому ж ході, що й перший опис задачі, якщо людина не сказала «роби».
- Міняти стек, контракт Wick Save/Load або схему БД без запису в `decisions.md` і оновлення spec.
- Вбудовувати Wick Editor у Next.js як npm-пакет або iframe з wickeditor.com.
- Комітити без явного прохання людини.

## Джерела правди

| Що | Файл |
|----|------|
| Бачення продукту | `memory-bank/projectbrief.md` |
| Зараз робимо | `memory-bank/activeContext.md` |
| Історія робіт | `memory-bank/progress.md` |
| Архітектурні рішення | `memory-bank/decisions.md` |
| MVP spec | `docs/specs/2026-08-17-wickworld-mvp-design.md` |
| План для команди | `docs/wickworld-plan.md` |
