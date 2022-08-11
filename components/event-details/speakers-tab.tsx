import React, { FunctionComponent } from 'react';
import { Header } from 'semantic-ui-react';
import { SpeakerCard } from '@components';

export type SpeakersTabProps = {
  speakers: any[];
  content: string;
  sessions: any[];
};

export const SpeakersTab: FunctionComponent<SpeakersTabProps> = ({
  speakers,
  content,
  sessions,
}) => {
  const topSpeakers = speakers.filter((speaker: any) => speaker.isTopSpeaker);
  const nonTopSpeakers = speakers.filter(
    (speaker: any) => !speaker.isTopSpeaker
  );
  return (
    <>
      {content && (
        <div
          className="bg-light-gray rounded p-8 mb-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {topSpeakers.length > 0 && (
        <>
          <Header as="h1">Featured Speakers</Header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 -mx-3 -my-6">
            {topSpeakers.map((speaker) => {
              const mappedSessions: any[] = [];
              sessions.map((currentSession) => {
                currentSession.speakers.map((currentSpeaker: any) => {
                  if (currentSpeaker.id === speaker.id)
                  mappedSessions.push(currentSession);
                });
              });
              return (
                <SpeakerCard
                  speaker={speaker}
                  key={speaker.id}
                  sessions={mappedSessions}
                />
              );
            })}
          </div>
          <hr className="border-black opacity-20 my-12" />
        </>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 -m-4">
        {nonTopSpeakers.map((speaker) => {
          const mappedSessions: any[] = [];

          sessions.map((currentSession) => {
            currentSession.speakers.map((currentSpeaker: any) => {
              if (currentSpeaker.id === speaker.id)
                mappedSessions.push(currentSession);
            });
          });
          return (
            <SpeakerCard
              speaker={speaker}
              key={speaker.id}
              sessions={mappedSessions}
            />
          );
        })}
      </div>
      {speakers.length <= 0 && topSpeakers.length <= 0 && (
        <div className="bg-light-gray rounded p-8 mb-8">
          TODO: no speakers message
        </div>
      )}
    </>
  );
};
