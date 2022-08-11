export const getSpeakerFromSpeakers = (
  speakerId: string,
  speakers: { id: string }[]
) => {
  const result = speakers.filter((s) => s.id === speakerId);
  return result.length >= 1 ? result[0] : [];
};
