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
import { list } from "@/utils/constants";
import type { Post } from "@/utils/sanity";

const EventsTestConditional = ({ posts }: { posts: Post[] }) => {
  const matches = useMediaQuery("(min-width: 768px)");

  const recentPost = posts.filter((_, index) => index === 0);
  const oldPosts = posts.filter((_, index) => index !== 0);

  return (
    <section className="py-12 px-4 md:px-20">
      <div className="text-3xl pb-8 font-bold ">✨EVENTS</div>
      <div className="relative flex gap-2">
        {recentPost.map((post) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className="flex-grow md:h-72"
          >
            <a href={`/events/${post.slug.current}`}>
              <Card className="cursor-pointer bg-[url('/person_float.png')] h-full">
                <div className="rounded-md  bg-gradient-to-b from-white to-transparent">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.slug.current}</CardDescription>
                  </CardHeader>
                  <CardContent />
                </div>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
      <div className="text-center bg-red-100">-- More --</div>
      <div className="pt-4 flex flex-col md:flex-row md:flex-wrap justify-between gap-y-1.5">
        {oldPosts.map((post) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className=" h-[150px] md:w-[33%] "
          >
            <a href={`/events/${post.slug.current}`}>
              <Card className="cursor-pointer bg-[url('/person_float.png')] h-full">
                <div className="rounded-md  bg-gradient-to-b from-white to-transparent">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.slug.current}</CardDescription>
                  </CardHeader>
                  <CardContent />
                </div>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventsTestConditional;
