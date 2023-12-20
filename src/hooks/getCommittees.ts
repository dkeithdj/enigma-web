import { db } from "@/firebase/server";
import type { TeamInfo } from "@/types";

export const getCommittees = async () => {
  const coreRef = db
    .collection("teams")
    .doc("sy_23_24")
    .collection("committees");
  const snapshot = await coreRef.orderBy("position").get();
  const committees = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
    } as TeamInfo;
  });
  return committees;
};
