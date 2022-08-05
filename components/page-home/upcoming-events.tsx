import React, { FunctionComponent } from 'react';
import { EventSlider } from '@components';
import { sort } from '@utils';

export type UpcomingEventsProps = {
  events: any[];
};

export const UpcomingEvents: FunctionComponent<UpcomingEventsProps> = ({
  events,
}) => {
  const sortedEvents = sort(events, 'start_date', 'asc');

  return (
    <EventSlider
      title="Upcoming Events"
      events={sortedEvents}
      direction="right"
    />
  );
};
