export enum URLS {
  main = '/',
  statistics = '/statistics',
  about = '/about',
  contactUs = '/contact-us',
}

export enum API {
  statisticsData = '/statistics-data',
  questions = '/questions',
  answers = '/answers',
  feedback = '/feedback',
  report = '/report'
}

export enum MAIN_VIEW_TYPES {
  intro = 'intro',
  test = 'test',
  results = 'results',
  watch = 'watch',
}

export const zeroTime = new Date(0, 0, 0).getTime();
