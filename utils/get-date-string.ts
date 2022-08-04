import { DateTime } from 'luxon';

export const getDateString = (isoStart: string, isoEnd: string) => {
  const start = DateTime.fromISO(isoStart);
  const end = DateTime.fromISO(isoEnd);

  const isSameDay = start.hasSame(end, 'day');

  if (isSameDay) {
    return start.toFormat('MMMM d, yyyy');
  }

  const isSameMonth = start.hasSame(end, 'month');

  if (isSameMonth) {
    return `${start.toFormat('MMMM d')} - ${end.toFormat('d, yyyy')}`;
  }

  return `${start.toFormat('MMM d')} - ${end.toFormat('MMM d, yyyy')}`;

  // TODO: another condition possibly would be across years dec28-jan1.
  // no events typically happen there but could be
};
