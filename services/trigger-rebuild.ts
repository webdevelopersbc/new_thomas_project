import { DateTime } from 'luxon';
import slugify from 'slugify';

export const rebuildDetailPage = async (startDate: Date, title: string) => {
  const slugifiedStartDate =
    DateTime.fromJSDate(startDate).toFormat('yyyy-MM-dd');
  const slugifiedTitle = slugify(title as string);

  await fetch(
    `/api/revalidate-detail?startDate=${slugifiedStartDate}&title=${slugifiedTitle}`
  );
};
