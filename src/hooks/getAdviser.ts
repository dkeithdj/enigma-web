import { db } from "@/firebase/server";
import type { TeamInfo } from "@/types";

export const getAdviser = async () => {
  const coreRef = db.collection("teams").doc("sy_23_24").collection("adviser");
  const snapshot = await coreRef.orderBy("position").get();
  const adviser = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
    } as TeamInfo;
  });
  return adviser;
};
