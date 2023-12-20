import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";

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
      className="relative flex flex-col items-center w-[180px] h-[250px]"
    >
      {/* <motion.div className="absolute top-0 left-0" whileHover={{ y: 5 }}>
        <Badge>{program}</Badge>
      </motion.div>
      <div className="absolute top-0 right-0">
        <Badge>{year_level}</Badge>
      </div> */}
      <CardHeader>
        <Avatar className="bg-red-200 w-32 h-32">
          <AvatarImage src={photo ? photo : "/assets/enigma_Logo.svg"} />
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardDescription>
        <div className="text-sm text-center text-black">
          {first_name} <span className="font-semibold">{last_name}</span>
        </div>
      </CardDescription>
      <CardFooter>
        <div className="text-sm text-center text-gray-400 whitespace-nowrap">
          {position}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Officer;
