import { officers } from "@/utils/constants";
import React from "react";
import Officer from "./Officer";

const Officers = () => {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {officers.map((officer) => (
        <Officer
          key={officer.first_name}
          first_name={officer.first_name}
          last_name={officer.last_name}
          position={officer.position}
          program={officer.program}
          year_level={officer.year_level}
          term={officer.term}
        />
      ))}
    </div>
  );
};

export default Officers;
