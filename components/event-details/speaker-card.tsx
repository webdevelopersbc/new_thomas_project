import React, { FunctionComponent, useState } from 'react';
import { toTitleCase } from '@utils';
import { SpeakerModal } from '@components';
import { DEFAULT_AVATAR } from '@constants';

export type SpeakerCardProps = {
  speaker: any;
  sessions: any[];
};

export const SpeakerCard: FunctionComponent<SpeakerCardProps> = ({
  speaker,
  sessions,
}) => {
  const [open, setOpen] = useState(false);
  const profilePicture = speaker.profilePicture || DEFAULT_AVATAR;
  return (
    <>
      <div
        key={speaker.id}
        className="text-center inline-block mx-4 my-4 cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        <div className="overflow-hidden rounded-lg mb-2">
          <img
            src={profilePicture}
            className="w-full rounded-lg group-hover:scale-125 transition-transform"
            alt={speaker.fullName}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = DEFAULT_AVATAR;
            }}
          />
        </div>

        <div className="font-bold text-pink text-2xl">
          {toTitleCase(speaker.fullName)}
        </div>
        <div>{speaker.tagLine}</div>
        <div className="hidden">{speaker.bio}</div>
      </div>
      <SpeakerModal
        speaker={speaker}
        sessions={sessions}
        open={open}
        close={() => setOpen(false)}
      />
    </>
  );
};
