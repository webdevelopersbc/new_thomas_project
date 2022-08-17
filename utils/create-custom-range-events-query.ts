export const createCustomRangeEventsQuery = (from: string, to: string) => {
  const customRangeEventsQuery = `(start_date ge '${from}') and (end_date lt '${to}') and (status eq 'published')`;
  return customRangeEventsQuery;
};
