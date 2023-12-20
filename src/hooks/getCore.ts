import { db } from "@/firebase/server";
import type { TeamInfo } from "@/types";

export const getCore = async () => {
  const coreRef = db.collection("teams").doc("sy_23_24").collection("core");
  const snapshot = await coreRef.orderBy("order").get();
  const core = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
    } as TeamInfo;
  });
  return core;
};
