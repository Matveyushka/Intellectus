export const URLS = {
  main: '/',
  /* TODO : 
   * Поменять часть сервера так, чтобы на клиенте использовать '/statistics'
   * в данный момент клиент при переходе по url: 'LH:hryak/statistics' 
   * сталкивается с ошибкой неверной переадресации и попытке вывести серверную часть. 
   */
  statistics: '/browse-statistics',
  about: '/about',
  contactUs: '/contact-us',
} as const;

export enum MAIN_VIEW_TYPES {
  intro = 'intro',
  test = 'test',
  results = 'results',
}
