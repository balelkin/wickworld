# Задача: Supabase Auth + CRUD проєктів

**Дата:** 2026-08-17  
**Статус:** done  
**Spec:** `docs/specs/2026-08-17-auth-and-projects.md`  
**Етап:** 1 MVP

## Мета

Учень реєструється, входить і керує списком своїх проєктів у базі — без Wick Editor.

## Входить

- SQL: profiles, projects, RLS, bucket `projects`
- Email + пароль (Supabase Auth)
- Сесія в cookies, захист `/projects`
- Створити / перейменувати / видалити / список
- Ліміт 20 проєктів
- i18n форм

## Не входить

- Wick, Save/Load `.wick`
- OAuth / код вчителя
- Деплой Vercel
- Підтвердження email у проді (для MVP вимикаємо в dashboard)

## Критерій готовності

- `npm run lint` і `npm run build` без ключів
- З ключами: реєстрація → список → створити → відкрити заглушку редактора → видалити
- Чужий `user_id` не читається (RLS)

## Погодження

- [x] Людина сказала робити Auth і кабінет
