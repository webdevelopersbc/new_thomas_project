import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';

const DateClock = dynamic<{}>(
  () => import('./date-clock').then((module) => module.DateClock),
  { ssr: false }
);

export const TopHeader: FunctionComponent = () => (
  <div id="top-header" className="flex bg-deep-purple">
    <div className="px-6 lg:px-10 py-3 text-slate-200 grow">
      <DateClock />
    </div>
  </div>
);
