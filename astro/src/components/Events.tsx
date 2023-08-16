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
  CardFooter,
} from "./ui/card";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { motion } from "framer-motion";
import { list } from "@/utils/constants";
import type { PostProp } from "@/utils/sanity/client";
import { formatDate, imageUrlFor } from "@/utils/sanity";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { getRelativeTime } from "@/utils/relativeTime";
import { Badge } from "./ui/badge";

const Events = ({ posts, limit }: { posts: PostProp[]; limit?: boolean }) => {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <div className="flex justify-between">
        <div className="text-3xl pb-8 font-bold ">EVENTS</div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-1.5 pt-1.5">
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-[200px] w-full"
          >
            <div
              className="absolute inset-0 bg-center bg-cover rounded-lg"
              style={{
                backgroundImage: `url('${
                  post.mainImage
                    ? imageUrlFor(post.mainImage).url()
                    : "/enigma_Logo.svg"
                }')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br  from-white via-transparent to-white/50 rounded-lg"></div>
            <a href={`/events/${post.slug.current}`}>
              <Card className="group absolute inset-0 flex  bg-opacity-50 bg-white">
                <div className="absolute top-2 right-2 hidden group-hover:block">
                  <ExternalLink color="gray" />
                </div>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription className="space-x-1">
                    {i == 0 && (
                      <Badge className="bg-yellow-300 text-black pointer-events-none">
                        Latest
                      </Badge>
                    )}
                    {post.categories.map((category) => (
                      <Badge className="pointer-events-none" key={category._id}>
                        {category.title}
                      </Badge>
                    ))}
                  </CardDescription>
                </CardHeader>
                <div className="absolute bottom-2 right-2 text-sm font-semibold">
                  {getRelativeTime(post._createdAt)}
                </div>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Events;
