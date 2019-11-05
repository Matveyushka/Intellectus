import * as React from 'react';
import { MainLayout } from './MainLayout';

export const App = (): React.ReactElement => {
  const [isLandscape, setIsLandscape] = React.useState<boolean>(false);

  React.useEffect((): void => {
    window.addEventListener('orientationchange', () => {
      const orientation = window.screen.orientation.type;

      if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    });
  }, []);

  if (isLandscape) {
    return (
      <div className="invalid-orientation">
        <h1>Please rotate your device</h1>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <MainLayout />
    </React.StrictMode>
  );
};
