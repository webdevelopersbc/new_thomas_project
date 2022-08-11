import { DateTime } from 'luxon';
import slugify from 'slugify';

export const getEventsPageSlug = (start: string, title: string) =>
  `/event/${DateTime.fromISO(start).toFormat('MM-dd-yyyy')}/${slugify(
    title
  ).toLowerCase()}`;
