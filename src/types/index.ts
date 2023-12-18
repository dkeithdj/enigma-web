export interface TimeInfo {
  year: number;
  month: string;
  date: number;
  dayOfWeek: string;
  time: string;
}

export interface EventInfo {
  location: string;
  time: string;
  title: string;
  slug: string;
  imageUrl?: string;
  description: string;
  timeStart: TimeInfo;
  timeEnd: TimeInfo;
}

export interface TeamInfo {
  first_name: string;
  last_name: string;
  position: string;
  imageUrl?: string;
  term: string;
  program?: string;
  year_level?: string;
}
