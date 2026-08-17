import { routing } from "./i18n/routing";
import type uk from "./messages/uk.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof uk;
  }
}
