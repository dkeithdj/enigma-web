import { useRef, useState } from "react";
import type {
  AdviserProp,
  CommitteeProp,
  OfficerProp,
} from "@/utils/sanity/client";
import { imageUrlFor } from "@/utils/sanity";
import Officer from "./Officer";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

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
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

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
          committeeHeads.map((committeeHead, i) => (
            <Sheet>
              <SheetTrigger asChild>
                <motion.div
                  key={committeeHead._id}
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
                    first_name={committeeHead.first_name}
                    last_name={committeeHead.last_name}
                    position={committeeHead.position.title}
                    program={committeeHead.program}
                    year_level={committeeHead.year_level}
                    term={committeeHead.current_term}
                    photo={
                      committeeHead.image &&
                      imageUrlFor(committeeHead.image).url()
                    }
                    committees={committees}
                  />
                </motion.div>
              </SheetTrigger>
              <SheetContent
                side={"bottom"}
                className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 focus:outline-none"
                onClick={() =>
                  setWidth(
                    carousel.current.scrollWidth - carousel.current.offsetWidth
                  )
                }
              >
                <SheetHeader className="font-semibold text-lg">
                  {committeeHead.position.title.split(" ")[0]} Committee
                </SheetHeader>
                <motion.div className="" ref={carousel}>
                  <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex justify-center gap-2"
                  >
                    {committees
                      ?.filter(
                        (personnel) =>
                          personnel.position.title ==
                          committeeHead.position.title.split(" ")[0]
                      )
                      .map((personnel) => (
                        <Officer
                          first_name={personnel.first_name}
                          last_name={personnel.last_name}
                          position={personnel.position.title}
                          program={personnel.program}
                          year_level={personnel.year_level}
                          term={personnel.current_term}
                          photo={
                            personnel.image &&
                            imageUrlFor(personnel.image).url()
                          }
                        />
                      ))}
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          ))}
      </div>
    </>
  );
};

export default Officers;
