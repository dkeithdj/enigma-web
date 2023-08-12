import { officers } from "@/utils/constants";
import React from "react";
import type {
  AdviserProp,
  CommitteeProp,
  OfficerProp,
} from "@/utils/sanity/client";
import { imageUrlFor } from "@/utils/sanity";
import Officer from "./Officer";
import { AnimatePresence, motion } from "framer-motion";

const Officers = ({
  adviser,
  officers,
  committeeHeads,
  committees,
  currentTerm,
}: {
  adviser: AdviserProp;
  officers: OfficerProp[];
  committeeHeads: CommitteeProp[];
  committees?: CommitteeProp[];
  currentTerm: string;
}) => {
  return (
    <>
      <div className="text-3xl font-bold text-center">ADVISER</div>
      <div className="text-sm font-light text-center pb-8">
        S.Y. {currentTerm && currentTerm}
      </div>
      <div className="flex justify-center pb-12">
        {adviser && (
          <motion.div
            key={adviser._id}
            initial={{ opacity: 0, translateX: -50, translateY: -50 }}
            whileInView={{
              opacity: 1,
              translateX: 0,
              translateY: 0,
              transition: { duration: 0.3 },
            }}
            viewport={{ once: true }}
          >
            <Officer
              first_name={adviser.first_name}
              last_name={adviser.last_name}
              position={adviser.position.title}
              term={adviser.current_term}
              photo={adviser.image && imageUrlFor(adviser.image).url()}
            />
          </motion.div>
        )}
      </div>
      <div className="text-3xl font-bold text-center">OFFICERS</div>
      <div className="text-sm font-light text-center pb-8">
        S.Y. {currentTerm && currentTerm}
      </div>
      <div className="flex justify-center gap-2 flex-wrap pb-12">
        {officers &&
          officers.map((officer, i) => (
            <motion.div
              key={officer._id}
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              whileInView={{
                opacity: 1,
                translateX: 0,
                translateY: 0,
                transition: { duration: 0.3, delay: 0.1 * i },
              }}
              viewport={{ once: true }}
            >
              <Officer
                key={officer._id}
                first_name={officer.first_name}
                last_name={officer.last_name}
                position={officer.position.title}
                program={officer.program}
                year_level={officer.year_level}
                term={officer.current_term}
                photo={officer.image && imageUrlFor(officer.image).url()}
              />
            </motion.div>
          ))}
      </div>
      <div className="text-3xl font-bold text-center">COMMITTEES</div>
      <div className="text-sm font-light text-center pb-8">
        S.Y. {currentTerm && currentTerm}
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {committeeHeads &&
          committeeHeads.map((committee, i) => (
            <motion.div
              key={committee._id}
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              whileInView={{
                opacity: 1,
                translateX: 0,
                translateY: 0,
                transition: { duration: 0.3, delay: 0.1 * i },
              }}
              viewport={{ once: true }}
            >
              <Officer
                first_name={committee.first_name}
                last_name={committee.last_name}
                position={committee.position.title}
                program={committee.program}
                year_level={committee.year_level}
                term={committee.current_term}
                photo={committee.image && imageUrlFor(committee.image).url()}
                committees={committees}
                isCommittee={true}
              />
            </motion.div>
          ))}
      </div>
    </>
  );
};

export default Officers;
