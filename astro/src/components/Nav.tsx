import { useState } from "react";
import { Badge } from "./ui/badge";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { motion } from "framer-motion";

const navMotion = {
  visible: {
    opacity: 1,

    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
};
const itemMotion = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const Nav = () => {
  const [toggled, setToggled] = useState(false);
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <nav className="sticky top-0 z-20">
      <div className="flex items-center justify-between bg-theme_text-light backdrop-filter backdrop-blur-xl bg-opacity-60 border-b-2 px-4 md:px-20">
        <div className="pt-2">
          <a href="/">
            <img src="/enigma_Horizontal.svg" alt="enigma" width="150" />
          </a>
        </div>
        {matches && (
          <div className="flex space-x-6">
            <a href="/" className="hover:text-theme_accent-light">
              Home
            </a>
            <a href="/about" className="hover:text-theme_accent-light">
              About
            </a>
            <a href="/events" className="hover:text-theme_accent-light">
              Events
            </a>
          </div>
        )}
        {/* <Badge className="bg-red-400 md:bg-yellow-400 lg:bg-orange-400 xl:bg-green-400">
          .
        </Badge> */}
        {!matches && (
          <div
            onClick={() => setToggled((prevToggle) => !prevToggle)}
            className="space-y-1.5 cursor-pointer z-30 md:hidden"
          >
            <motion.span
              animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
              className="block h-0.5 w-8 bg-black"
            ></motion.span>
            <motion.span
              animate={{
                width: toggled ? 0 : 24,
              }}
              className="block h-0.5 w-6 bg-black"
            ></motion.span>
            <motion.span
              animate={{
                rotateZ: toggled ? -45 : 0,
                y: toggled ? -8 : 0,
                width: toggled ? 32 : 16,
              }}
              className="block h-0.5 w-4 bg-black"
            ></motion.span>
          </div>
        )}
      </div>
      {toggled && !matches && (
        <div className="fixed flex bg-gray-300 top-19 w-full  items-center justify-center backdrop-filter backdrop-blur-xl bg-opacity-60">
          <motion.div
            variants={navMotion}
            animate="visible"
            initial="hidden"
            className="flex flex-col justify-around gap-4 py-2 text-lg"
          >
            <a href="/" className="hover:text-theme_accent-light">
              Home
            </a>
            <a href="/about" className="hover:text-theme_accent-light">
              About
            </a>
            <a href="/events" className="hover:text-theme_accent-light">
              Events
            </a>
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
