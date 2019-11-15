import * as React from 'react';
import { Header, Footer } from '../components';

const paragraph1 = 'Welcome to Intellectus project site. '
  + 'Here is the place where you can try to figure out how well your mind '
  + 'is able to solve logical tasks and perception problems. ';
const paragraph2 = 'The feature of the Intellectus system is '
  + 'using problem generating algorithms. '
  + 'That means it is very little chance to face the same task you solved before. '
  + 'Each test session will be unique. ';
const paragraph3 = 'Proposed testing is anonymous '
  + 'until you want to share your result with friends. '
  + 'Intellectus collects information about number of people passed the test and their results - '
  + 'you can familiarize with our statistics - but not any personal data. ';
const paragraph4 = 'If you would like the site, share it to others. '
  + 'If you have a theme for conversation, write us an email. ';

export interface AboutProps {
    location: Location;
  }

export const About = ({ location }: AboutProps): React.ReactElement | null => (
  <div className="main-layout main-container about">
    <div className="intro">
      <Header location={location} />
    </div>
    <div className="about-content">
      {paragraph1}
      <br />
      <br />
      {paragraph2}
      <br />
      <br />
      {paragraph3}
      <br />
      <br />
      {paragraph4}
    </div>
    <Footer />
  </div>
);
