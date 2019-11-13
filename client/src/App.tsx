import * as React from 'react';
import { MainLayout } from './MainLayout';

export const App = (): React.ReactElement => {
  const [isLandscape, setIsLandscape] = React.useState<boolean>(false);

  React.useEffect((): void => {
    if (navigator.userAgent.includes('Win')) return;

    window.addEventListener('orientationchange', () => {
      const orientation = window.screen.orientation.type;

      if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    });
  }, []);

  return (
    <React.StrictMode>
      <MainLayout />
      {isLandscape && (
        <div className="invalid-orientation">
          <h1>Please rotate your device</h1>
        </div>
      )}
    </React.StrictMode>
  );
};
