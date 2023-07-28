import { list } from "@/utils/constants";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { motion } from "framer-motion";

const Events = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <section className="py-12 px-4 md:px-20">
      <div className="text-3xl pb-8 font-bold ">✨EVENTS</div>
      <div className="relative flex flex-col ">
        {matches && (
          <div>
            {list
              .filter((_, index) => index === 0)
              .map((item) => (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href={`/events/${item.slug}`}>
                    <Card
                      key={item.slug}
                      className="cursor-pointer md:h-72 bg-[url('/leaves.png')] "
                    >
                      <div className="rounded-md h-full bg-gradient-to-r from-white to-transparent">
                        <CardHeader>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          this contains stuf that are stuff
                        </CardContent>
                      </div>
                    </Card>
                  </a>
                </motion.div>
              ))}
          </div>
        )}
        <div className="md:gap-4 md:flex">
          {list
            .filter((_, index) => (!matches ? "all" : index !== 0))
            .map((item) => (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                className="md:w-1/2 md:min-h-[14rem]"
              >
                <a href={`/events/${item.slug}`}>
                  <Card
                    key={item.slug}
                    className=" cursor-pointer  bg-[url('/person_float.png')] my-4 h-full"
                  >
                    <div className="rounded-md  bg-gradient-to-b from-white to-transparent">
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent />
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}
        </div>
        {/* <div className="bg-gradient-to-b from-transparent to-slate-500 ">
          View More
        </div> */}
      </div>
    </section>
  );
};

export default Events;
