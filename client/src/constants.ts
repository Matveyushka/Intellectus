export const URLS = {
  main: '/',
  statistics: '/statistics',
  about: '/about',
  contactUs: '/contact-us',
} as const;

export enum MAIN_VIEW_TYPES {
  intro = 'intro',
  test = 'test',
  results = 'results',
  watch = 'watch',
}
