import { db } from "@/firebase/server";

export const getEvents = async () => {
  const eventsRef = db.collection("events");
  const eventsSnapshot = await eventsRef.get();

  const events = eventsSnapshot.docs.map((doc) => doc.data());

  return events;
};
