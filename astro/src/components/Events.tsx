import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
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
import type { Post } from "@/utils/sanity/client";
import { imageUrlFor } from "@/utils/sanity";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const EventsTestConditional = ({
  posts,
  limit,
}: {
  posts: Post[];
  limit?: boolean;
}) => {
  const matches = useMediaQuery("(min-width: 768px)");

  const recentPost = posts.filter((_, index) => index === 0);
  const oldPosts = limit
    ? posts.filter((_, index) => index >= 1 && index <= 3)
    : posts.filter((_, index) => index !== 0);
  return (
    <section className="py-12 px-4 md:px-20">
      <div className="flex justify-between">
        <div className="text-3xl pb-8 font-bold ">✨EVENTS</div>
        {limit && (
          <a
            href="/events"
            className="flex items-end text-md pb-2 hover:text-theme_accent-light"
          >
            <p>View More </p>
            <span>
              <ArrowRight />
            </span>
          </a>
        )}
      </div>
      <div className="relative flex gap-2">
        {recentPost.map((post) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex-grow h-48"
          >
            <div
              className="absolute inset-0 bg-center bg-cover rounded-lg"
              style={{
                backgroundImage: `url('${
                  post.mainImage && imageUrlFor(post.mainImage).url()
                }')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-white rounded-lg"></div>
            <a href={`/events/${post.slug.current}`}>
              <Card className="group absolute inset-0 flex bg-opacity-50 bg-white">
                <div className="absolute top-2 right-2 hidden group-hover:block">
                  <ExternalLink color="gray" />
                </div>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.slug.current}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
      <div className="pt-1.5 flex flex-col md:flex-row md:flex-wrap justify-between gap-y-1.5">
        {oldPosts.map((post) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-[200px] md:w-[33%]"
          >
            <div
              className="absolute inset-0 bg-center bg-cover rounded-lg"
              style={{
                backgroundImage: `url('${
                  post.mainImage && imageUrlFor(post.mainImage).url()
                }')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-white rounded-lg"></div>
            <a href={`/events/${post.slug.current}`}>
              <Card className="group absolute inset-0 flex  bg-opacity-50 bg-white">
                <div className="absolute top-2 right-2 hidden group-hover:block">
                  <ExternalLink color="gray" />
                </div>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.slug.current}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventsTestConditional;
