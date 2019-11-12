import * as React from 'react';
import { Header } from '../components';

export interface AboutProps {
    location: Location;
  }

export const About = ({ location }: AboutProps): React.ReactElement | null => (
  <div className="main-layout about">
    <Header location={location} />
  </div>
);
