import { Variants, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { imageUrlFor } from "@/utils/sanity";
import type { CommitteeProp } from "@/utils/sanity/client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Drawer } from "vaul";

const Officer = ({
  first_name,
  last_name,
  position,
  program,
  year_level,
  term,
  photo,
  committees,
  isCommittee,
  cardHeight,
}: {
  first_name: string;
  last_name: string;
  position?: string;
  program?: string;
  year_level?: string;
  term?: string;
  photo?: string;
  committees?: CommitteeProp[];
  isCommittee?: boolean;
  cardHeight?: string;
}) => {
  return (
    <Card className={`w-[180px] h-[${cardHeight ? cardHeight : "270"}px]`}>
      <CardHeader>
        <Avatar className="bg-red-200 w-32 h-32">
          <AvatarImage src={photo ? photo : "/enigma_Logo.svg"} />
          <AvatarFallback>{first_name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardDescription>
        {program ? (
          <div className="flex justify-center items-center gap-1">
            <Badge className="bg-theme_primary hover:bg-theme_accent-light">
              {program}
            </Badge>
            <Badge className="bg-theme_accent-light hover:bg-theme_primary whitespace-nowrap">
              {year_level} Year
            </Badge>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-1">
            <Badge className="bg-theme_primary hover:bg-theme_accent-light">
              Professor
            </Badge>
          </div>
        )}
        <div className="text-sm text-center text-black">
          {first_name} <span className="font-semibold">{last_name}</span>
        </div>
      </CardDescription>
      <CardFooter className="flex flex-col">
        <div className="text-xs text-center text-gray-400 whitespace-nowrap">
          {position}
        </div>
        {committees && (
          <div className="flex items-center -space-x-4">
            {committees
              .filter(
                (committee) =>
                  committee.position.title == position?.split(" ")[0]
              )
              .map((committee) => (
                <motion.div
                  initial={{ translateY: 0 }}
                  whileHover={{ translateY: -4 }}
                  key={committee._id}
                  className="hover:z-20 focus:z-20"
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        committee.image && imageUrlFor(committee.image).url()
                      }
                      alt={committee.first_name}
                    />
                    <AvatarFallback>
                      {committee.first_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Officer;
