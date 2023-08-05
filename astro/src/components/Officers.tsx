import { officers } from "@/utils/constants";
import React from "react";
import type {
  AdviserProp,
  CommitteeProp,
  OfficerProp,
} from "@/utils/sanity/client";
import { imageUrlFor } from "@/utils/sanity";
import Officer from "./Officer";

const Officers = ({
  adviser,
  officers,
  committeeHeads,
  currentTerm,
}: {
  adviser: AdviserProp;
  officers: OfficerProp[];
  committeeHeads: CommitteeProp[];
  currentTerm: string;
}) => {
  return (
    <>
      <div className="text-3xl font-bold text-center">ADVISER</div>
      <div className="text-sm font-light text-center pb-8">
        S.Y. {currentTerm}
      </div>
      <div></div>
      <div className="flex justify-center pb-12">
        <Officer
          first_name={adviser.first_name}
          last_name={adviser.last_name}
          position={adviser.position.title}
          term={adviser.current_term}
          photo={adviser.image && imageUrlFor(adviser.image).url()}
        />
      </div>
      <div className="text-3xl font-bold text-center">OFFICERS</div>
      <div className="text-sm font-light text-center pb-8">
        S.Y. {currentTerm}
      </div>
      <div className="flex justify-center gap-2 flex-wrap pb-12">
        {officers.map((officer) => (
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
        ))}
      </div>
      <div className="text-3xl font-bold text-center">COMMITTEES</div>
      <div className="text-sm font-light text-center pb-8">
        S.Y. {currentTerm}
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {committeeHeads.map((committee) => (
          <Officer
            key={committee._id}
            first_name={committee.first_name}
            last_name={committee.last_name}
            position={committee.position.title}
            program={committee.program}
            year_level={committee.year_level}
            term={committee.current_term}
            photo={committee.image && imageUrlFor(committee.image).url()}
          />
        ))}
      </div>
    </>
  );
};

export default Officers;
