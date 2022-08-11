import React, { FunctionComponent, useEffect, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import {
  PageLayout,
  SessionsTab,
  HomeTab,
  ScheduleTab,
  SpeakersTab,
  HeroTile,
} from '@components';
import shuffleArray from 'shuffle-array';
import {
  getAllEvents,
  getGridSmart,
  getSessions,
  getSpeakers,
} from '@services';
import { GetStaticPaths, GetStaticProps } from 'next';

export type EventDetailsProps = {
  event: any;
};

const EventDetails: FunctionComponent<EventDetailsProps> = ({ event }) => {
  const [sessions, setSessions] = useState(null);
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      const _sessions = await getSessions(event.sessionize_key);
      setSessions(_sessions);
      const shuffledSpeakers = shuffleArray(
        await getSpeakers(event.sessionize_key)
      );
      setSpeakers(shuffledSpeakers);
      const scheduleEvent = await getGridSmart(event.sessionize_key);
      setSchedule(scheduleEvent);
    };
    fetchData();
  }, [event.sessionize_key]);

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

export const getStaticProps: GetStaticProps = async () => {
  const allEvents = await getAllEvents();

  return {
    props: { event: allEvents[0] },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
