import * as React from 'react';
import { Header, Footer } from '../components';

export interface AboutProps {
    location: Location;
  }

export const About = ({ location }: AboutProps): React.ReactElement | null => (
  <div className="main-layout main-container about">
    <div className="intro">
      <Header location={location} />
    </div>
    <div className="about-content">
      <p>
        {`Welcome to Intellectus project site. 
        Here is the place where you can try to figure out how well your
        mind is able to solve logical tasks and perception problems.`}
      </p>
      <p>
        {`The feature of the Intellectus system is 
        using problem generating algorithms. 
        That means it is very little chance to face the same task you solved before. 
        Each test session will be unique.` }
      </p>
      <p>
        {`Proposed testing is anonymous 
        until you want to share your result with friends. 
        Intellectus collects information about number of people passed the test and their results - 
        you can familiarize with our statistics - but not any personal data.`}
      </p>
      <p>
        {`If you would like the site, share it to others. 
        If you have a theme for conversation, write us an email.`}
      </p>
    </div>
    <Footer />
  </div>
);
