import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getDateString, getEventsPageSlug } from '@utils';

export type EventCardProps = {
  featured: boolean;
  start_date: string;
  end_date: string;
  title: string;
  RowKey: string;
  id: string;
  className: string;
  preview_image: string;
  location: string;
  address1: string;
  address2: string;
  city: string;
  state_province: string;
  country: string;
};

export const EventCard: FunctionComponent<EventCardProps> = ({
  featured,
  start_date,
  end_date,
  title,
  RowKey,
  id,
  className,
  preview_image,
  location,
  address1,
  address2,
  city,
  state_province,
  country,
}) => {
  const rowSpan = featured ? 'col-span-1 sm:col-span-2' : 'col-span-1'; // on mobile using col-span-1, but at sm and up use col-span-2
  const pageUrl = getEventsPageSlug(start_date, title);
  return (
    <div
      className={`relative group rounded-lg overflow-hidden m-4 h-[400px] ${rowSpan} ${className}`}
      key={RowKey || id}
    >
      <Link href={pageUrl}>
        <a className="h-full w-full block">
          <div
            className="h-full w-full z-0 bg-center bg-cover bg-no-repeat group-hover:scale-125 transition-transform"
            style={{ backgroundImage: `url('${preview_image}')` }}
          />
          <div className="bg-black h-full w-full opacity-50 absolute top-0 left-0" />
          <div className="absolute bottom-0 left-0 p-5 text-white z-30">
            <div className="font-display text-4xl">{title}</div>
            <div className="flex flex-row sm:flex-col lg:flex-row">
              <div className="flex flex-row">
                <div>
                  <FontAwesomeIcon icon={faCalendar} className="pr-2" />
                </div>
                <div>{getDateString(start_date, end_date)}</div>
              </div>
              <div className="flex flex-row ml-4 sm:ml-0 md:ml-0 lg:ml-4">
                <div>
                  <FontAwesomeIcon icon={faLocationDot} className="pr-2" />
                </div>
                <div>
                  {location && <div>{location}</div>}
                  <div>{address1}</div>
                  <div>{address2}</div>
                  <div>
                    {city},{state_province},{country}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
