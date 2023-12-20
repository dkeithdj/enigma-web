import { db } from "@/firebase/server";
import type { EventInfo } from "@/types";
import { getTimestamp } from "@/utils/getTimestamp";

export const getEvents = async () => {
  const eventsRef = db.collection("events");
  const eventsSnapshot = await eventsRef.get();

  const events = eventsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      timeStart: getTimestamp(data.timeStart.toDate()),
      timeEnd: getTimestamp(data.timeEnd.toDate()),
    } as EventInfo;
  });

  return events;
};
