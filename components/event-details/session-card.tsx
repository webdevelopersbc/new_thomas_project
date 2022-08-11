import React, { FunctionComponent, useState } from 'react';
import { getSpeakerSessions, nl2br, toTitleCase } from '@utils';
import { SessionDetail, SpeakerModal } from '@components';

export type SessionCardProps = {
  session: any;
  allSpeakerSessions: any[];
  speakers: any[];
};

export const SessionCard: FunctionComponent<SessionCardProps> = ({
  session,
  allSpeakerSessions,
  speakers,
}) => {
  const [speakerModal, setSpeakerModal] = useState(
    Array.from({ length: session.speakers.length }, () => false)
  );

  const toggleModal = (event: any, index: number, open: boolean) => {
    const newArray = speakerModal.map((s, j) => {
      if (event.target.className.indexOf('close') !== -1) return false;
      if (j === index && open) return true;
      return false;
    });
    setSpeakerModal(newArray);
  };

  return (
    <div key={session.id} className="bg-light-gray rounded p-8 mb-8">
      {speakers.map((speaker, i) => (
        <div
          key={speaker.id}
          className="cursor-pointer inline-block"
          onClick={(e) => toggleModal(e, i, true)}
        >
          <div className="text-pink text-lg mb-1 mr-4 hover:text-deep-purple">
            {toTitleCase(speaker.fullName)}
          </div>
          <SpeakerModal
            speaker={speaker}
            sessions={getSpeakerSessions(speaker.id, allSpeakerSessions)}
            open={speakerModal[i]}
            close={(e) => toggleModal(e, i, false)}
          />
        </div>
      ))}
      <div className="text-2xl mb-4 font-bold">{session.title}</div>
      <div dangerouslySetInnerHTML={{ __html: nl2br(session.description) }} />
      <SessionDetail {...session} className="mt-6" />
    </div>
  );
};
