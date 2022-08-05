import { DateTime } from 'luxon';

export const createCustomRangeEventsQuery = (start: Date, end: Date) => {
  const begin = DateTime.fromJSDate(start).toISODate();
  const finish = DateTime.fromJSDate(end).toISODate();
  const customRangeEventsQuery = `(start_date ge '${begin}') and (end_date lt '${finish}') and (status eq 'published')`;
  return customRangeEventsQuery;
};
