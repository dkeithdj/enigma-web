import { imageUrlFor, formatDate } from "@/utils/sanity";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Post } from "@/utils/sanity/client";
import { Separator } from "./ui/separator";

const Author = ({ post }: { post: Post }) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <Avatar className="h-14 w-auto">
          <AvatarImage
            src={
              post.author.image
                ? imageUrlFor(post.author.image).url()
                : "/enigma_Logo.svg"
            }
          />
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
        <div className="leading-2">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-gray-600">{formatDate(post._createdAt)}</p>
        </div>
      </div>
      <Separator className="my-4 h-1.5 rounded-full" />
    </>
  );
};

export default Author;
