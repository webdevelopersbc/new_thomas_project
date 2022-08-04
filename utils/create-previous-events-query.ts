import { DateTime } from 'luxon';

export const createPreviousEventsQuery = () => {
  const today = DateTime.now().toISODate();
  const previousEventsQuery = `(end_date lt '${today}') and (status eq 'published')`;
  return previousEventsQuery;
};
