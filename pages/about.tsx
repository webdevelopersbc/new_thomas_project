import React from 'react';
import { PageLayout } from '../components/layouts/page-layout';

const About = () => (
    <PageLayout title="About" invert>
      <div className="text-white">
        <div className="bg-light-gray rounded mb-6 px-6 py-4 text-black">
          <p className="">Commitee</p>
          <p>Volunteers</p>
        </div>
      </div>
    </PageLayout>
  );

export default About;
