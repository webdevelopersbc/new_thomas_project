import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import dynamic from 'next/dynamic';

const Moment = dynamic(() => import('react-moment'), { ssr: false });

export const DateClock: FunctionComponent = () => (
  <span className="content-start whitespace-nowrap">
    <FontAwesomeIcon icon={faCalendar} className="pr-2" />
    <Moment
      format="MMMM D, YYYY h:mm a"
      interval={15000}
      className="hidden sm:inline"
    />
    <Moment
      format="M/D/YY h:mm a"
      interval={15000}
      className="inline sm:hidden"
    />
  </span>
);
