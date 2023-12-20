import { db } from "@/firebase/server";
import type { TeamInfo } from "@/types";

export const getCommitteeHeads = async () => {
  const coreRef = db
    .collection("teams")
    .doc("sy_23_24")
    .collection("committee_head");
  const snapshot = await coreRef.orderBy("position").get();
  const committeeHeads = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
    } as TeamInfo;
  });
  return committeeHeads;
};
