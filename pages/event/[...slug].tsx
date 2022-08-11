import React, { FunctionComponent, useEffect, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import {
  PageLayout,
  SessionsTab,
  HomeTab,
  SpeakersTab,
  HeroTile,
  ScheduleTabProps,
} from '@components';
import shuffleArray from 'shuffle-array';
import {
  getAllEvents,
  getGridSmart,
  getSessions,
  getSpeakers,
} from '@services';
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

const ScheduleTab = dynamic<ScheduleTabProps>(
  () =>
    import('../../components/event-details/schedule-tab').then(
      (module) => module.ScheduleTab
    ),
  { ssr: false }
);

export type EventDetailsProps = {
  event: any;
  sessions: any[];
  schedule: any[];
  speakers: any[];
};

const EventDetails: FunctionComponent<EventDetailsProps> = ({
  event,
  sessions,
  schedule,
  speakers,
}) => {
  const panes = [
    {
      menuItem: 'Home',
      render: () => (
        <Tab.Pane className="!p-0 !border-0 !bg-transparent">
          <HomeTab event={event} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Sessions',
      render: () => (
        <Tab.Pane className="!p-0 !border-0 !bg-transparent">
          {speakers && sessions && (
            <SessionsTab
              sessions={sessions}
              content={event.sessions_content}
              speakers={speakers}
            />
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Speakers',
      render: () => (
        <Tab.Pane className="!p-0 !border-0 !bg-transparent">
          {speakers && sessions && (
            <SpeakersTab
              speakers={speakers}
              sessions={sessions}
              content={event.speakers_content}
            />
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Schedule',
      render: () => (
        <Tab.Pane className="!p-0 !border-0 !bg-transparent">
          {schedule && (
            <ScheduleTab schedule={schedule} content={event.schedule_content} />
          )}
        </Tab.Pane>
      ),
    },
  ];

  //   { menuItem: "Sponsors", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  //   { menuItem: "Venue", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  //   { menuItem: "About", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  // ]

  return (
    <>
      <HeroTile event={event} compact />
      <PageLayout>
        <>
          <Tab panes={panes} menu={{}} className="page-tabs" />
          <div className="hidden">
            {Object.entries(event).map(([k, v]) => (
              <div key={k}>{`${k} : ${v}`}</div>
            ))}
          </div>
        </>
      </PageLayout>
    </>
  );
};

export default EventDetails;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const allEvents = await getAllEvents();

  const event = allEvents[0];

  const sessions = await getSessions(event.sessionize_key);
  const speakers = await getSpeakers(event.sessionize_key);
  const schedule = await getGridSmart(event.sessionize_key);

  const shuffledSpeakers = shuffleArray(speakers);

  return {
    props: { event, sessions, schedule, speakers: shuffledSpeakers },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
