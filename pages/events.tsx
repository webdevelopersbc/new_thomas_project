import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import  Typewriter  from 'typewriter-effect';
import { PageLayout, EventCard, AppButton } from '@components';
import { Checkbox, Dropdown, Transition } from 'semantic-ui-react';
import {
  createCustomRangeEventsQuery,
  datesActive,
  randomBool,
  sort,
} from '@utils';
import { DateTime } from 'luxon';
import { getEvents } from '@services';
import {
  QUERY_PREVIOUS_EVENTS,
  QUERY_UPCOMING_EVENTS,
  CUSTOM_RANGE,
  PREVIOUS_EVENTS,
  UPCOMING_EVENTS,
} from '@constants';
import { string } from 'yup';

const Flatpickr = dynamic(() => import('react-flatpickr'), { ssr: false });

// TODO show no events when there is nothing available from filters
const Events: NextPage = () => {
  const past =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).has('past')
      : false;
  const [when, setWhen] = useState<string>(
    past ? PREVIOUS_EVENTS : UPCOMING_EVENTS
  );
  const [dateRange, setDateRange] = useState([
    DateTime.now().toJSDate(),
    DateTime.now().plus({ weeks: 1 }).toJSDate(),
  ]);
  const [countries, setCountriesValue] = useState([]);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>();
  const [callForSpeakersFilter, setCallForSpeakersFilter] =
    useState<boolean>(false);
  const [callForSponsorsFilter, setCallForSponsorsFilter] =
    useState<boolean>(false);
  const [registrationOpenFilter, setRegistrationOpenFilter] =
    useState<boolean>(false);


    //almost like different pages, the background keeps changing.
    //

  useEffect(() => {
    fetchAndSetEvent();
  }, [when, dateRange]);

  useEffect(() => {
    filterEvents(events);
  }, [
    events,
    countries,
    registrationOpenFilter,
    callForSpeakersFilter,
    callForSponsorsFilter,
  ]);

  const fetchAndSetEvent = async () => {
    let filter = '';
    let sortDirection: 'asc' | 'desc' = 'asc';

    switch (when) {
      case UPCOMING_EVENTS:
        filter = QUERY_UPCOMING_EVENTS;
        sortDirection = 'asc';
        break;
      case PREVIOUS_EVENTS:
        filter = QUERY_PREVIOUS_EVENTS;
        sortDirection = 'desc';
        break;
      case CUSTOM_RANGE:
        // TODO this fires twice need to stop it
        if (dateRange.length <= 1) return; // prevent query when only one range was selected
        filter = createCustomRangeEventsQuery(dateRange[0], dateRange[1]);
        sortDirection = 'asc';
        break;
      default:
        console.log('unexpected filter');
    }

    const response = await getEvents(filter);
    const sorted = sort(response, 'start_date', sortDirection);
    setEvents(sorted);

    const countries = [...new Set(sorted.map((s, i) => { 
      return {
        key: i,
        text: s.country,
        value: s.country
      } 
    }))];

    setCountryOptions(countries);
    console.log('🚀 ~ file: events.tsx ~ line 90 ~ fetchAndSetEvent ~ countries', countries);
  };

  const filterEvents = (eventsInput: any[]) => {
    const filtered = eventsInput.filter((event) => {
      event.display = true;
      //display = true; // default to show the event
      
      
      if (countries.length >= 1) {
       console.log(event);
        const countrySelected = countries.find((c) => c === event.country);
        console.log('🚀 ~ file: events.tsx ~ line 111 ~ filtered ~ countrySelected', countrySelected);
        if (!countrySelected) event.display = false;
        console.log('🚀 ~ file: events.tsx ~ line 113 ~ filtered ~ !countrySelected', !countrySelected);
      }
      console.log('🚀 ~ file: events.tsx ~ line 106 ~ filtered ~ display', event.display);

      if (registrationOpenFilter) {
        const registrationActive = datesActive(
          event.registration_start_date,
          event.registration_end_date
        );
        if (event.display && !registrationActive) event.display = false;
      }

      if (callForSpeakersFilter) {
        const callForSpeakersActive = datesActive(
          event.speaker_call_start_date,
          event.speaker_call_end_date
        );
        if (event.display && !callForSpeakersActive) event.display = false;
      }

      if (callForSponsorsFilter) {
        const callForSponsorsActive = datesActive(
          event.sponsor_call_start_date,
          event.sponsor_call_end_date
        );
        if (event.display && !callForSponsorsActive) event.display = false;
      }

      return event;
    });

    console.log(filtered);
    setFilteredEvents(filtered);
  };

  const updateCountries = async (_event: any, data: any) => {
    console.log(data.value);
    setCountriesValue(data.value);
  };

  const whenOptions = [
    {
      key: 0,
      text: UPCOMING_EVENTS,
      value: UPCOMING_EVENTS,
    },
    {
      key: 1,
      text: PREVIOUS_EVENTS,
      value: PREVIOUS_EVENTS,
    },
    {
      key: 2,
      text: CUSTOM_RANGE,
      value: CUSTOM_RANGE,
    },
  ];

  return (
    <PageLayout bgImage title="">
      <div className="mb-10 mt-12">
        <div className="font-body text-6xl font-extrabold pt-48 pb-16 text-white">
          <span>Discover </span>
          <span className="text-pink inline-block">
            <Typewriter
            options={{
              wrapperClassName: "inline-block"
            }}
            onInit={(typewriter) => {
              typewriter
              .typeString('Conferences').pauseFor(2500).deleteAll()
              .typeString('Bootcamps').pauseFor(2500).deleteAll()
              .typeString('Community Events')
              .start();
            }}
            />
          </span>
          <div className="mt-2">happening across the world.</div>
        </div>
        <div className="bg-white rounded-md my-6 py-12 px-10">
          <div className="text-black flex">
            <div className="pr-10">
              <div className="uppercase font-bold font-body text-lg mb-2">
                When
              </div>
              <div>
                <Dropdown
                  placeholder="Timespan"
                  selection
                  value={when}
                  options={whenOptions}
                  onChange={(_event, data) => {
                    setWhen(data.value as string);
                  }}
                />
              </div>
            </div>
            <Transition
              visible={when === CUSTOM_RANGE}
              animation="fade"
              duration={500}
            >
              <div className="pr-10">
                <div className="uppercase font-bold font-body text-lg mb-2">
                  Date Range
                </div>
                <div>
                  <Flatpickr
                    value={dateRange}
                    options={{
                      dateFormat: 'M j, Y',
                      mode: 'range',
                    }}
                    onClose={(range) => setDateRange(range)}
                    multiple
                  />
                </div>
              </div>
            </Transition>
            <div className="pr-10 relative z-50">
              <div className="uppercase font-bold font-body text-lg mb-2">
                Where
              </div>
              <div>
                <Dropdown
                  placeholder="Country"
                  selection
                  clearable
                  multiple
                  onChange={updateCountries}
                  options={countryOptions}
                />
              </div>
            </div>
            <div className="pr-10 relative z-50">
              <div className="uppercase font-bold font-body text-lg mb-2">
                Filters
              </div>
              <div className="flex">
                <Checkbox
                  label="Registration Open"
                  className="mr-5"
                  onChange={(_e, data) =>
                    setRegistrationOpenFilter(Boolean(data.checked))
                  }
                />
                <Checkbox
                  label="Call for Speakers"
                  className="mr-5"
                  onChange={(_e, data) =>
                    setCallForSpeakersFilter(Boolean(data.checked))
                  }
                />
                <Checkbox
                  label="Call for Sponsors"
                  className="mr-5"
                  onChange={(_e, data) =>
                    setCallForSponsorsFilter(Boolean(data.checked))
                  }
                />
              </div>
            </div>
            <div className="shrink hidden">
              <AppButton text="Search" className="px-10" />
            </div>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 -mx-4">
          {filteredEvents &&
            filteredEvents.map((event) => (
              <Transition
                visible={event.display}
                animation={randomBool() ? 'fly right' : 'fly left'}
                duration={500}
                key={event.RowKey}
              >
                <EventCard {...event} />
              </Transition>
            ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Events;
