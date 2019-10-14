import axios, { AxiosRequestConfig } from 'axios';
import * as React from 'react';

type FetchResult<T> = [boolean, Partial<T>];
// правило сломалось и требует обернуть дженерик в круглые скобки
export const useFetch = <T>(
// eslint-disable-next-line arrow-parens
  url: string,
  shouldFetch: boolean,
  config?: AxiosRequestConfig,
): FetchResult<T> => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<T | null>(null);

  React.useEffect(() => {
    if (shouldFetch) {
      setIsLoading(true);

      axios(url, { method: 'get', ...config })
        .then((res) => {
          setData(res.data);
        })
        .catch((err: Error) => {
          throw err;
        })
        .finally(() => setIsLoading(false));
    }
  }, [shouldFetch]);

  return [
    isLoading,
    data || {},
  ];
};
