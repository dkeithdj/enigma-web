import type { APIRoute } from "astro";

export type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
};

const events: Event[] = [
  {
    id: 1,
    name: "Event 1",
    date: "2022-01-01",
    location: "Location 1",
  },
  {
    id: 2,
    name: "Event 2",
    date: "2022-02-01",
    location: "Location 2",
  },
  {
    id: 3,
    name: "Event 3",
    date: "2022-03-01",
    location: "Location 3",
  },
];

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(events));
};