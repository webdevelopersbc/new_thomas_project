import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

export const DateClock = () => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 10000);
  }, []);

  return (
    <span className="content-start whitespace-nowrap for-h" >
      <FontAwesomeIcon icon={faCalendar} className="pr-2" />
      {dateState.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}
    </span>
  );
};
