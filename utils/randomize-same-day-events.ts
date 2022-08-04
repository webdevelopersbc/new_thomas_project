import { DateTime } from 'luxon';

export const randomizeSameDayEvents = (array: any[]) =>
  array.sort((a, b) => {
    const aStart = DateTime.fromISO(a.start_date).toISODate();
    const bStart = DateTime.fromISO(b.start_date).toISODate();
    if (aStart === bStart) {
      return Math.round(Math.random()) * 2 - 1;
    }
    return 0;
  });
