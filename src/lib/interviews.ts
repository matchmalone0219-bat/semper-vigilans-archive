import {
  INTERVIEWS,
  SPEAKERS,
  type InterviewQuote,
} from "@/data/interviews";

export const SPEAKER_MAP = Object.fromEntries(SPEAKERS.map((s) => [s.id, s]));

export function interviewsByPerson(personId: string): InterviewQuote[] {
  const speaker = SPEAKERS.find((s) => s.personId === personId);
  if (!speaker) return [];
  return INTERVIEWS.filter((q) => q.speakerId === speaker.id).sort((a, b) => b.iso.localeCompare(a.iso));
}
