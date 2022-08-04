export const sort = (
  array: any[],
  prop: string,
  direction: 'asc' | 'desc'
) => {
  if (!array) return [];
  if (direction.toLowerCase() === 'asc') {
    return array.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
  }
  if (direction.toLowerCase() === 'desc') {
    return array.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
  }
  return array;
};
