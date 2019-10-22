import * as React from 'react';

export const toDataURL = (data: string): string | undefined => {
  if (!data) return undefined;

  return `data:image/svg+xml;base64,${data}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useInterval = (callback: (...args: any) => any, delay: number | null): void => {
  const memoizedCallback = React.useRef<typeof callback>(callback);

  React.useEffect((): void => {
    memoizedCallback.current = callback;
  }, [callback]);

  React.useEffect((): void | (() => void) => {
    const tick = (): void => memoizedCallback.current();

    if (delay !== null) {
      const timerId = setInterval(tick, delay);

      return () => clearInterval(timerId);
    }

    return undefined;
  }, [delay]);
};
