import { useEffect, useState } from "react";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { motion } from "framer-motion";
import LoginCard from "./LoginCard";

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

  const [home, setHome] = useState(false);
  const [events, setEvents] = useState(false);
  const [team, setTeam] = useState(false);
  const [about, setAbout] = useState(false);

  useEffect(() => {
    const pathnameToState: any = {
      "/": { home: true, events: false, team: false, about: false },
      "/events": { home: false, events: true, team: false, about: false },
      "/team": { home: false, events: false, team: true, about: false },
      "/about": { home: false, events: false, team: false, about: true },
    };
    const { pathname } = window.location;

    const isEventsRoute = pathname.startsWith('/events');
    const isTeamRoute = pathname.startsWith('/team');
    const isAboutRoute = pathname.startsWith('/about');
    const newState = pathnameToState[pathname] || { home: false, events: isEventsRoute, team: isTeamRoute, about: isAboutRoute };
    setHome(newState.home);
    setEvents(newState.events);
    setTeam(newState.team);
    setAbout(newState.about);
  }, []);

  return (
    <nav className="sticky top-0 z-20">
      <div className="bg-bahamablue-50 backdrop-filter backdrop-blur-xl bg-opacity-60 border-b-2">
        <div className="flex max-w-[800px] mx-auto items-center justify-between px-4 md:px-0">
          <a href="/" className="py-4">
            <img src="/enigma-horizontalv4.svg" alt="enigma" width="150" />
          </a>

          {matches && (
            <div className="flex space-x-6 py-2">
              <a href="/" className={ `p-2 rounded-lg hover:bg-bahamablue-400 hover:text-bahamablue-50 transition-all ${home && "bg-bahamablue-400 text-bahamablue-50"}` }>
                Home
              </a>
              <a href="/events" className={ `p-2 rounded-lg hover:bg-bahamablue-500 hover:text-bahamablue-50 transition-all ${events && "bg-bahamablue-500 text-bahamablue-50"}` }>
                Events
              </a>
              <a href="/team" className={ `p-2 rounded-lg hover:bg-bahamablue-600 hover:text-bahamablue-50 transition-all ${team && "bg-bahamablue-600 text-bahamablue-50"}` }>
                Team
              </a>
              <a href="/about" className={ `p-2 rounded-lg hover:bg-bahamablue-700 hover:text-bahamablue-50 transition-all ${about && "bg-bahamablue-700 text-bahamablue-50"}` }>
                About
              </a>
            </div>
          )}

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
      </div>

      {toggled && !matches && (
        <div className="fixed flex bg-bahamablue-50 w-full items-center justify-center backdrop-filter backdrop-blur-xl bg-opacity-60">
          <motion.div
            variants={navMotion}
            animate="visible"
            initial="hidden"
            className="flex flex-col justify-around gap-4 py-2 text-lg"
          >
            <a href="/" className="hover:text-bahamablue-700">
              Home
            </a>
            <a href="/events" className="hover:text-bahamablue-700">
              Events
            </a>
            <a href="/team" className="hover:text-bahamablue-700">
              Team
            </a>
            <a href="/about" className="hover:text-bahamablue-700">
              About
            </a>
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
