import React, { FunctionComponent } from 'react';
import { DateClock } from '@components';

export const TopHeader: FunctionComponent = () => (
    <div id="top-header" className="flex bg-deep-purple">
      <div className="px-6 lg:px-10 py-3 text-slate-200 grow">
        <DateClock />
      </div>
    </div>
  );
