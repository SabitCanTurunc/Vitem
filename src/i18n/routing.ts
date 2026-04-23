import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed' // Removes '/tr' since it is the default locale, useful for clean base URLs, or keeping it strictly subpath. Let's keep it strictly subpath (always '/tr' or '/en') for safety on static generation if needed, but 'as-needed' is default. Let's force it to standard 'always' so the user visually sees /tr or /en.
});

export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);
