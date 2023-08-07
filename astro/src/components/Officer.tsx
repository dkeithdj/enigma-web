import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { imageUrlFor } from "@/utils/sanity";

const Officer = ({
  first_name,
  last_name,
  position,
  program,
  year_level,
  term,
  photo,
}: {
  first_name: string;
  last_name: string;
  position?: string;
  program?: string;
  year_level?: string;
  term?: string;
  photo?: string;
}) => {
  return (
    <Card
      key={last_name}
      className="relative flex flex-col items-center w-[180px] h-[270px]"
    >
      {/* <motion.div className="absolute top-0 left-0" whileHover={{ y: 5 }}>
        <Badge>{program}</Badge>
      </motion.div>
      <div className="absolute top-0 right-0">
        <Badge>{year_level}</Badge>
      </div> */}
      <CardHeader>
        <Avatar className="bg-red-200 w-32 h-32">
          <AvatarImage src={photo ? photo : "/enigma_Logo.svg"} />
          <AvatarFallback>E</AvatarFallback>
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
        <div className="text-sm text-center text-gray-400 whitespace-nowrap">
          {position}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Officer;
