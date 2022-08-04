import { DateTime } from 'luxon';

export const datesActive = (
  start?: string,
  end?: string,
  initialDate?: string
) => {
  if (!start || !end) return false;

  const checkPoint = initialDate
    ? DateTime.fromISO(initialDate)
    : DateTime.now();

  const daySameOrAfter =
    checkPoint.startOf('day') >= DateTime.fromISO(start).startOf('day');

  const daySameOrBefore =
    checkPoint.startOf('day') <= DateTime.fromISO(end).startOf('day');

  const active = daySameOrAfter && daySameOrBefore;

  return active;
};
