/* eslint-disable camelcase */
import React, { FunctionComponent } from 'react';
import { AppButton } from '@components';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { datesActive, getDateString } from '@utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faGlobe,
  faHashtag,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { Header } from 'semantic-ui-react';
import { DateTime } from 'luxon';

export type HomeTabProps = {
  event: {
    home_content: string;
    location: string;
    address1: string;
    address2: string;
    city: string;
    state_province: string;
    country: string;
    postal_code: string;
    start_date: string;
    end_date: string;
    registration_start_date: string;
    registration_end_date: string;
    registration_url: string;
    speaker_call_start_date: string;
    speaker_call_end_date: string;
    call_for_speakers_link: string;
    sponsor_call_start_date: string;
    sponsor_call_end_date: string;
    call_for_sponsors_link: string;
    twitter: string;
    hashtag: string;
    website: string;
  };
};

export const HomeTab: FunctionComponent<HomeTabProps> = ({ event }) => {
  const {
    home_content,
    location,
    address1,
    address2,
    city,
    state_province,
    country,
    postal_code,
    start_date,
    end_date,
    registration_start_date,
    registration_end_date,
    registration_url,
    speaker_call_start_date,
    speaker_call_end_date,
    call_for_speakers_link,
    sponsor_call_start_date,
    sponsor_call_end_date,
    call_for_sponsors_link,
    twitter,
    hashtag,
    website,
  } = event;
  return (
    <div className="flex space-x-6">
      <div className="w-9/12">
        <div
          className="bg-light-gray rounded p-8"
          dangerouslySetInnerHTML={{ __html: home_content }}
        />
      </div>
      <div className="w-3/12">
        <div className="bg-light-gray rounded p-8 mb-8">
          <Header as="h1">Details</Header>

          <div className="flex flex-row mb-6">
            <div className="text-pink relative bottom-1">
              <FontAwesomeIcon icon={faLocationDot} className="pr-2" />
            </div>
            <div>
              <Header as="h3" className="!mb-0">
                Address
              </Header>
              {location && <div>{location}</div>}
              <div>{address1}</div>
              {address2 && <div>{address2}</div>}
              <div>
                {city},{state_province} {postal_code}, {country}
              </div>
            </div>
          </div>

          <div className="flex flex-row mb-6">
            <div className="text-pink relative bottom-1">
              <FontAwesomeIcon icon={faCalendar} className="pr-2" />
            </div>
            <div>
              <Header as="h3" className="!mb-0">
                Date / Time
              </Header>
              {getDateString(start_date, end_date)}
              <br />
              {/* todo need start time end time */}
              {DateTime.fromISO(start_date).toLocaleString(
                DateTime.TIME_SIMPLE
              )}{' '}
              -{' '}
              {DateTime.fromISO(end_date).toLocaleString(DateTime.TIME_SIMPLE)}
            </div>
          </div>

          {/* <div>
            {registration_start_date}-{registration_end_date}
          </div> */}
          <div className="mb-6">
            <div className="mb-2">
              <Header as="h3">Registration</Header>
            </div>
            {datesActive(registration_start_date, registration_end_date) ? (
              <AppButton text="Register" link={registration_url} hasIcon />
            ) : (
              <div>Registration is closed.</div>
            )}
          </div>

          {/* <div>
            {speaker_call_start_date}-{speaker_call_end_date}
          </div> */}
          {speaker_call_start_date && speaker_call_end_date && (
            <div className="mb-6">
              <div className="mb-2">
                <Header as="h3" className="!mb-0">
                  Call for Speakers
                </Header>
              </div>
              {datesActive(speaker_call_start_date, speaker_call_end_date) ? (
                <AppButton
                  text="Apply to Speak"
                  link={call_for_speakers_link}
                  hasIcon
                />
              ) : (
                <div>Call for speakers is closed.</div>
              )}
            </div>
          )}

          {/* <div>
            {sponsor_call_start_date }-{sponsor_call_end_date}
          </div> */}
          {sponsor_call_start_date && sponsor_call_end_date && (
            <div className="mb-6">
              <div className="mb-2">
                <Header as="h3" className="!mb-0">
                  Call for Sponsors
                </Header>
              </div>
              {datesActive(sponsor_call_start_date, sponsor_call_end_date) ? (
                <AppButton
                  text="Apply to Sponsor"
                  link={call_for_sponsors_link}
                  hasIcon
                />
              ) : (
                <div>Call for sponsors is closed.</div>
              )}
            </div>
          )}
        </div>

        <div className="bg-light-gray rounded p-8 mb-8">
          <Header as="h1">Social / Web</Header>

          {twitter && (
            <div className="flex flex-row mb-6">
              <div className="text-pink relative bottom-1">
                <FontAwesomeIcon icon={faTwitter} className="pr-2" />
              </div>
              <div>
                <Header as="h3" className="!mb-0">
                  Twitter
                </Header>
                <a href={`https://twitter.com/${twitter}`}>@{twitter}</a>
              </div>
            </div>
          )}

          {hashtag && (
            <div className="flex flex-row mb-6">
              <div className="text-pink relative bottom-1">
                <FontAwesomeIcon icon={faHashtag} className="pr-2" />
              </div>
              <div>
                <Header as="h3" className="!mb-0">
                  Hashtag
                </Header>
                <a href={`https://twitter.com/search?q=${hashtag}`}>
                  #{hashtag}
                </a>
              </div>
            </div>
          )}

          {website && (
            <div className="flex flex-row mb-6">
              <div className="text-pink relative bottom-1">
                <FontAwesomeIcon icon={faGlobe} className="pr-2" />
              </div>
              <div>
                <Header as="h3" className="!mb-0">
                  Website
                </Header>
                <a href={website}>{website}</a>
              </div>
            </div>
          )}
        </div>

        <div className="bg-light-gray rounded p-8 hdidden">
          <Header as="h1">Map</Header>
          <div>
            <iframe
              title="Event Location"
              width="100%"
              height="250px"
              frameBorder="0"
              src="https://www.bing.com/maps/embed?h=400&w=500&cp=40.26016058924532~-74.00111666734165&lvl=17.41145116760152&typ=d&sty=r&src=SHELL&FORM=MBEDV8"
              scrolling="no"
            />
            <div>
              <a
                id="largeMapLink"
                target="_blank"
                href="https://www.bing.com/maps?cp=40.26016058924532~-74.00111666734165&amp;sty=r&amp;lvl=17.41145116760152&amp;FORM=MBEDLD"
                rel="noreferrer"
              >
                View Larger Map
              </a>{' '}
              &nbsp; | &nbsp;
              <a
                id="dirMapLink"
                target="_blank"
                href="https://www.bing.com/maps/directions?cp=40.26016058924532~-74.00111666734165&amp;sty=r&amp;lvl=17.41145116760152&amp;rtp=~pos.40.26016058924532_-74.00111666734165____&amp;FORM=MBEDLD"
                rel="noreferrer"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
