import React, { useEffect, useState } from 'react';
import { EventSlider } from '@components';
import { sort } from '@utils';
import { getEvents } from '@services';
import { QUERY_UPCOMING_EVENTS } from '@constants';

export function UpcomingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents(QUERY_UPCOMING_EVENTS);
      const sorted = sort(events, 'start_date', 'asc');
      setUpcomingEvents(sorted);
    };
    fetchData();
  }, []);

  return (
    <EventSlider
      title="Upcoming Events"
      events={upcomingEvents}
      direction="right"
    />
  );
}
