import { DateTime } from 'luxon';

export const createUpcomingEventsQuery = () => {
  const today = DateTime.now().toISODate();
  const upcomingEventsQuery = `(('${today}' ge start_date and '${today}' le end_date) or (start_date ge '${today}')) and (status eq 'published')`;
  return upcomingEventsQuery;
};
