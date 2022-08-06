import React, { FunctionComponent } from 'react';
import { EventSlider } from '@components';
import { sort } from '@utils';

export type PreviousEventsProps = {
  events: any[];
};

export const PreviousEvents: FunctionComponent<PreviousEventsProps> = ({
  events,
}) => {
  const sortedEvents = sort(events, 'start_date', 'asc');

  return (
    <EventSlider
      title="Previous Events"
      events={sortedEvents}
    />
  );
};
