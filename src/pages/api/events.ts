import { db } from "@/firebase/server";
import type { EventInfo } from "@/types";
import { getTimestamp } from "@/utils/getTimestamp";
import type { APIContext, APIRoute } from "astro";

export const GET = async () => {
  try {
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

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
};
