import axios, { AxiosRequestConfig } from 'axios';
import { isFunction } from 'lodash';
import * as React from 'react';

type FetchResult<T> = Partial<T>;
// правило сломалось и требует обернуть дженерик в круглые скобки
// eslint-disable-next-line arrow-parens
export const useFetch = <T>({
  url,
  shouldFetch,
  onLoad,
  config,
}: {
  url: string,
  shouldFetch: boolean,
  config?: AxiosRequestConfig,
  onLoad?: () => void,
}): FetchResult<T> => {
  const [data, setData] = React.useState<T | null>(null);

  React.useEffect(() => {
    if (shouldFetch) {
      axios(url, { method: 'get', ...config })
        .then((res) => {
          setData(res.data);
        })
        .catch((err: Error) => {
          throw err;
        })
        .finally(() => {
          if (isFunction(onLoad)) onLoad();
        });
    }
  }, [shouldFetch]);

  return data || {};
};
