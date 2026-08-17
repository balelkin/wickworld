# Supabase

1. Створи проєкт на https://supabase.com
2. SQL Editor → вставь `migrations/20260817120000_init.sql` → Run
3. Authentication → Providers → Email → вимкни **Confirm email** (MVP)
4. Settings → API: скопіюй URL і anon key у `.env.local` (див. `.env.example`)
5. Перезапусти `npm run dev`

Service role key потрібен пізніше для адмін-операцій; для Auth учня достатньо anon key.
