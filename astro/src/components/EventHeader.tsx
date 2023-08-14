import { Copy, CopyCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { imageUrlFor, formatDate } from "@/utils/sanity";
import { Separator } from "@radix-ui/react-separator";
import type { PostProp } from "@/utils/sanity/client";
import { useState } from "react";

const EventHeader = ({ post, url }: { post: PostProp; url: string }) => {
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <>
      <h1 className="text-4xl font-bold gap-4 inline-flex items-baseline">
        {post.title}
        <span onClick={handleCopy}>
          {copied === url ? (
            <CopyCheck width={30} height={30} color="gray" />
          ) : (
            <Copy width={30} height={30} />
          )}
        </span>
      </h1>
      {post.author && (
        <div className="flex gap-4 items-center py-2">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={
                post.author.image
                  ? imageUrlFor(post.author.image).url()
                  : "/enigma_Logo.svg"
              }
              className="w-14 h-14"
            />
            <AvatarFallback>E</AvatarFallback>
          </Avatar>
          <div className="leading-2">
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-gray-600">
              {formatDate(post._createdAt)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EventHeader;
