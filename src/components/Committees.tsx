import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";

const Committees = () => {
  return (
    <div className="flex items-center -space-x-4">
      <motion.div
        initial={{ translateY: 0 }}
        whileHover={{ translateY: -4 }}
        className="hover:z-20 focus:z-20 bg-red-100"
      >
        <Avatar className="">
          <AvatarImage />
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
      </motion.div>
      <motion.div
        initial={{ translateY: 0 }}
        whileHover={{ translateY: -4 }}
        className="hover:z-20 focus:z-20 bg-blue-100"
      >
        <Avatar className="">
          <AvatarImage />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </motion.div>
    </div>
  );
};

export default Committees;
