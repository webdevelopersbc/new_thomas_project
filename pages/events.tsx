import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { GetServerSideProps, NextPage } from 'next';
import {
  Checkbox,
  CheckboxProps,
  Dropdown,
  DropdownProps,
  Transition,
} from 'semantic-ui-react';
import { DateTime } from 'luxon';
import {
  createCustomRangeEventsQuery,
  createPreviousEventsQuery,
  createUpcomingEventsQuery,
  datesActive,
  randomBool,
  sort,
} from '@utils';
import { getEvents } from '@services';
import { PageLayout, EventCard, AppButton, TypeWriter } from '@components';
import {
  COUNTRY_LIST,
  EVENT_FILTER_OPTIONS,
  EVENT_FILTER_TYPE,
} from '@constants';

const Flatpickr = dynamic(() => import('react-flatpickr'), { ssr: false });

export type EventsProps = {
  events: any[];
};

const Events: NextPage<EventsProps> = ({ events }) => {
  const [selectedCountries, setSelectedCountriesValue] = useState<string[]>([]);
  const [fiterCheckboxes, setFiterCheckboxes] = useState({
    registrationOpen: false,
    callForSpeakers: false,
    callForSponsors: false,
  });

  const { query, isReady, push: routerPush } = useRouter();

  const handleUpdateWhenEvent = (when: string) => {
    const defaultDateRange = {
      from: DateTime.now().toISODate(),
      to: DateTime.now().plus({ weeks: 1 }).toISODate(),
    };

    if (when === EVENT_FILTER_TYPE.CUSTOM) {
      routerPush({
        query: {
          when,
          ...defaultDateRange,
        },
      });
    } else {
      routerPush({
        query: {
          when,
        },
      });
    }
  };

  const handleUpdateCustomRange = (range: Date[]) => {
    const [from, to] = range;

    routerPush({
      query: {
        ...query,
        from: DateTime.fromJSDate(from).toISODate(),
        to: DateTime.fromJSDate(to).toISODate(),
      },
    });
  };

  const getDefaultSelectedDateRange = () => {
    const from = query.from as string;
    const to = query.to as string;

    if (from && to) {
      return [
        DateTime.fromISO(from).toJSDate(),
        DateTime.fromISO(to).toJSDate(),
      ];
    }

    return [
      DateTime.now().toJSDate(),
      DateTime.now().plus({ weeks: 1 }).toJSDate(),
    ];
  };

  const whenFilter = isReady
    ? query.when || EVENT_FILTER_TYPE.UPCOMING
    : EVENT_FILTER_TYPE.UPCOMING;

  const countrySelections = [
    ...new Set(
      events.map((event, index) => {
        return {
          key: index,
          text: COUNTRY_LIST[event.country.toLowerCase()],
          value: event.country,
        };
      })
    ),
  ];

  const filteredEvents = events.filter((event) => {
    event.display = true;

    if (selectedCountries.length >= 1) {
      const countrySelected = selectedCountries.find(
        (c) => c === event.country
      );
      if (!countrySelected) event.display = false;
    }

    if (fiterCheckboxes.registrationOpen) {
      const registrationActive = datesActive(
        event.registration_start_date,
        event.registration_end_date
      );
      if (event.display && !registrationActive) event.display = false;
    }

    if (fiterCheckboxes.callForSpeakers) {
      const callForSpeakersActive = datesActive(
        event.speaker_call_start_date,
        event.speaker_call_end_date
      );
      if (event.display && !callForSpeakersActive) event.display = false;
    }

    if (fiterCheckboxes.callForSponsors) {
      const callForSponsorsActive = datesActive(
        event.sponsor_call_start_date,
        event.sponsor_call_end_date
      );
      if (event.display && !callForSponsorsActive) event.display = false;
    }

    return event;
  });

  return (
    <PageLayout bgImage title="">
      <div className="mb-10 mt-12">
        <div className="font-body text-6xl font-extrabold pt-48 pb-16 text-white">
          <span className="pr-4">Discover</span>
          <TypeWriter
            words={['Conferences', 'Bootcamps', 'Community Events']}
          />
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
                  value={whenFilter}
                  options={EVENT_FILTER_OPTIONS}
                  onChange={(_event, data) => {
                    handleUpdateWhenEvent(data.value as string);
                  }}
                />
              </div>
            </div>
            <Transition
              visible={whenFilter === EVENT_FILTER_TYPE.CUSTOM}
              animation="fade"
              duration={500}
            >
              <div className="pr-10">
                <div className="uppercase font-bold font-body text-lg mb-2">
                  Date Range
                </div>
                <div>
                  <Flatpickr
                    value={getDefaultSelectedDateRange()}
                    options={{
                      dateFormat: 'M j, Y',
                      mode: 'range',
                    }}
                    onClose={handleUpdateCustomRange}
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
                  onChange={(
                    _event: React.SyntheticEvent<HTMLElement>,
                    data: DropdownProps
                  ) => setSelectedCountriesValue(data.value as string[])}
                  options={countrySelections}
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
                  name="registrationOpen"
                  onChange={(
                    _event: React.FormEvent<HTMLInputElement>,
                    data: CheckboxProps
                  ) =>
                    setFiterCheckboxes({
                      ...fiterCheckboxes,
                      [data.name as string]: Boolean(data.checked),
                    })
                  }
                />
                <Checkbox
                  label="Call for Speakers"
                  className="mr-5"
                  name="callForSponsors"
                  onChange={(
                    _event: React.FormEvent<HTMLInputElement>,
                    data: CheckboxProps
                  ) =>
                    setFiterCheckboxes({
                      ...fiterCheckboxes,
                      [data.name as string]: Boolean(data.checked),
                    })
                  }
                />
                <Checkbox
                  label="Call for Sponsors"
                  className="mr-5"
                  name="callForSponsors"
                  onChange={(
                    _event: React.FormEvent<HTMLInputElement>,
                    data: CheckboxProps
                  ) =>
                    setFiterCheckboxes({
                      ...fiterCheckboxes,
                      [data.name as string]: Boolean(data.checked),
                    })
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
          {filteredEvents?.length &&
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
          {!filteredEvents?.length && <h3>No event found</h3>}
        </div>
      </div>
    </PageLayout>
  );
};

export default Events;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const when = query?.when;
  const from = query?.from;
  const to = query?.to;

  let filter = '';
  let sortDirection: 'asc' | 'desc' = 'asc';

  switch (when) {
    case EVENT_FILTER_TYPE.UPCOMING:
      filter = createUpcomingEventsQuery();
      break;
    case EVENT_FILTER_TYPE.PREVIOUS:
      filter = createPreviousEventsQuery();
      sortDirection = 'desc';
      break;
    case EVENT_FILTER_TYPE.CUSTOM:
      if (from && to) {
        filter = createCustomRangeEventsQuery(from as string, to as string);
        break;
      }
      break;
    default:
      break;
  }

  const events = await getEvents(filter);

  const sortedEvents = sort(events, 'start_date', sortDirection);

  return {
    props: { events: sortedEvents },
  };
};
