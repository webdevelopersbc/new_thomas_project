import { DateTime } from 'luxon';
import slugify from 'slugify';

export const getEventsPageSlug = (start: string, title: string) =>
  `/events/${DateTime.fromISO(start).toFormat('yyyy')}/${slugify(
    title
  ).toLowerCase()}`;
