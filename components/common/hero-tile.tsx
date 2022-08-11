import React, { FunctionComponent } from 'react';
import { getDateString, getEventsPageSlug, datesActive } from '@utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Counter, AppButton } from '@components';
import { useRouter } from 'next/router';

export type HeroTileProps = {
  event: {
    id: string;
    registration_start_date: string;
    registration_end_date: string;
    location: string;
    city: string;
    state_province: string;
    address1: string;
    address2: string;
    banner_image: string;
    banner_image_attribution_link: string;
    banner_image_attribution_text: string;
    title: string;
    start_date: string;
    end_date: string;
    tagline: string;
    registration_url: string;
    twitter: string;
    hashtag: string;
  };
  compact?: boolean;
  showDetails?: boolean;
};

export const HeroTile: FunctionComponent<HeroTileProps> = ({
  event,
  compact,
  showDetails,
}) => {
  const router = useRouter();

  const registrationActive = datesActive(
    event.registration_start_date,
    event.registration_end_date
  );

  const locationStr = `${event.location}, ${event.city}, ${event.state_province}`;

  const addressStr = `${event.address1}, ${
    event.address2 ? `${event.address2}, ` : ''
  }${event.city}, ${event.state_province}`;

  const displayAddress = event.location ? locationStr : addressStr;

  return (
    <div
      className="bg-cover relative flex items-center bg-no-repeat bg-center h-full w-full min-h-[60vh]"
      style={{
        backgroundImage: `url('${event.banner_image}')`,
      }}
    >
      <div className="absolute right-4 bottom-2 z-30 text-white">
        <a href={event.banner_image_attribution_link}>
          {event.banner_image_attribution_text}
        </a>
      </div>
      <div className="bg-black h-full w-full opacity-60 absolute top-0 left-0" />
      <div className="h-full w-full text-white relative z-10 px-16 md:px-28 lg:px-32 xl:px-40 pt-0 flex items-center">
        <div className={`flex w-full ${compact ? 'mt-[140px]' : ''}`}>
          <div className="grow">
            <div className="font-display text-6xl lg:text-6xl xl:text-7xl">
              {event.title}
            </div>
            <div className="font-display text-pink text-5xl lg:text-5xl xl:text-6xl">
              {getDateString(event.start_date, event.end_date)}
            </div>
            <div className="font-display text-4xl lg:text-4xl xl:text-5xl">
              {displayAddress}
            </div>
            {event.tagline && (
              <div className="font-dm-sans mt-5 xl:mt-14 text-1xl max-w-screen-sm pr-8">
                {event.tagline}
              </div>
            )}
            <div className="flex">
              {showDetails && (
                <AppButton
                  text="Event Details"
                  onClick={() =>
                    router.push(
                      getEventsPageSlug(event.start_date, event.title)
                    )
                  }
                  className="mt-14 mr-6"
                />
              )}
              {registrationActive && (
                <AppButton
                  text="Register"
                  link={event.registration_url}
                  hasIcon
                  className="mt-14"
                />
              )}
            </div>
          </div>
          <div className="shrink flex-col hidden lg:flex">
            <div className="flex justify-end content-center mb-8">
              <div className="pt-2">
                {event.twitter && (
                  <div className="font-display text-3xl">
                    <a href={`https://twitter.com/${event.twitter}`}>
                      @{event.twitter}
                    </a>
                  </div>
                )}
                {event.hashtag && (
                  <div className="font-display text-3xl">
                    <a href={`https://twitter.com/search?q=${event.hashtag}`}>
                      #{event.hashtag}
                    </a>
                  </div>
                )}
              </div>
              <div className="shrink grid content-center pl-4">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-5xl text-[#1da1f2]"
                />
              </div>
            </div>
            <div className="flex justify-end grow items-end">
              <Counter
                key={event.id}
                startDate={event.start_date}
                endDate={event.end_date}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
