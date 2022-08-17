export const EVENT_FILTER_TYPE = {
  UPCOMING: 'upcomming',
  PREVIOUS: 'previous',
  CUSTOM: 'custom'
}

export const EVENT_FILTER_OPTIONS = [
  {
    value: EVENT_FILTER_TYPE.UPCOMING,
    text: 'Upcoming Events',
  },
  {
    value: EVENT_FILTER_TYPE.PREVIOUS,
    text: 'Previous Events',
  },
  {
    value: EVENT_FILTER_TYPE.CUSTOM,
    text: 'Custom Range',
  },
];

export const EVENT_TYPES = [
  {
    key: 'In Person',
    text: 'In Person',
    value: 'In Person',
  },
  {
    key: 'Virtual',
    text: 'Virtual',
    value: 'Virtual',
  },
  {
    key: 'Hybrid',
    text: 'Hybrid',
    value: 'Hybrid',
  },
];

export const HARD_CODE_CLIENT_ID = '24dccf3a5fdf0e834c35a22707217de7'; // IMPORTANT: REMOVE THIS

export const COLORS = [
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#e67e22',
  '#e74c3c',
  '#1abc9c',
  '#2c3e50',
  '#686de0',
  '#ffbe76',
  '#ff7979',
  '#6ab04c',
  '#22a6b3',
  '#e056fd',
  '#686de0',
  '#30336b',
];

export const DEFAULT_AVATAR = '/images/avatar.png';
