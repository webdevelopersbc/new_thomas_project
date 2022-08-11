import { DateTime } from 'luxon';

export const plusOneDay = (dayString: string) => {
  return DateTime.fromISO(dayString).plus({ day: 1 }).toFormat('yyyy-MM-dd');
};
