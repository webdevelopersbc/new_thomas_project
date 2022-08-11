export const getSessionsForSpeakers = (
  speakers: { sessions: any[] }[],
  sessions: { id: string }[]
) => {
  const allSpeakerSessions: any[] = [];
  speakers.forEach((speaker) => {
    speaker.sessions.forEach((speakerSession: { id: string }) => {
      sessions.forEach((session) => {
        if (speakerSession.id === session.id) allSpeakerSessions.push(session);
      });
    });
  });
  return allSpeakerSessions;
};
