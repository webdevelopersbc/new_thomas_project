import React, { FunctionComponent, useState } from 'react';
import { DateTime } from 'luxon';
import { SessionModal } from '@components';

export type SessionDetailProps = {
  className: string;
  showTitle: boolean;
  title: string;
  description: string;
  room: string;
  startsAt: string;
  endsAt: string;
  categories: any[];
};

export const SessionDetail: FunctionComponent<SessionDetailProps> = ({
  className,
  showTitle,
  title,
  room,
  startsAt,
  endsAt,
  categories,
  description,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      {showTitle && (
        <div
          className="mb-2 text-xl cursor-pointer hover:text-pink"
          onClick={() => setOpen(true)}
        >
          {title}
        </div>
      )}
      {room && (
        <div className="rounded mb-2 mr-2 px-4 py-2 bg-deep-purple text-white inline-block">
          {room}
        </div>
      )}
      {startsAt && endsAt && (
        <div className="rounded mb-2 mr-2 px-4 py-2 bg-pink text-white inline-block">
          {DateTime.fromISO(startsAt).toFormat('EEE h:mm a')} -
          {DateTime.fromISO(endsAt).toFormat('h:mm a')}
        </div>
      )}
      {categories?.map((c, i) => (
        <div
          key={c.id}
          className="rounded mb-2 mr-2 px-4 py-2 bg-slate-500 text-white inline-block"
        >
          <span>
            {c.categoryItems.map((ci: { id: string; name: string }) => (
              <span key={ci.id}>{ci.name}</span>
            ))}
          </span>
        </div>
      ))}
      <SessionModal
        title={title}
        description={description}
        open={open}
        close={() => setOpen(false)}
      />
    </div>
  );
};
