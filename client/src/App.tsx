import * as React from 'react';
import { MainLayout } from './MainLayout';

export const App = (): React.ReactElement => (
  <div>
    <React.StrictMode>
      <MainLayout />
    </React.StrictMode>
  </div>
);
