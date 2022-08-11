export const getSpeakerSessions = (
  speakerId: string,
  sessions: { speakers: { id: string }[] }[]
) => {
  const speakerSessions: any[] = [];
  sessions.forEach((session) => {
    session.speakers.forEach((speaker) => {
      if (speakerId === speaker.id) speakerSessions.push(session);
    });
  });
  return speakerSessions;
};
