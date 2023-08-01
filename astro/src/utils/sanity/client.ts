import { createClient } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
// import { blocksToText } from "@sanity/block-content-to-react";
import groq from "groq";

if (
  !import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  !import.meta.env.PUBLIC_SANITY_DATASET
) {
  throw new Error("Did you forget to run sanity init --env?");
}

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-03-20", // date of setup
});

export async function getTerm(): Promise<{ current_term: string }> {
  return await client.fetch(groq`*[_type == "siteSettings"][0] {current_term}`);
}

export async function getPosts(): Promise<Post[]> {
  return await client.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

// modified to fetch image url
export async function getPost(slug: string): Promise<Post> {
  return await client.fetch(
    groq`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        title,
        slug,
        excerpt,
        "mainImage": mainImage.asset->url,
        body 
      }
    `,
    {
      slug,
    }
  );
}

export async function getOfficers(): Promise<Officers[]> {
  return await client.fetch(
    groq`*[_type == "officer"] | order(position.hierarchy asc)`
  );
}

export async function getOfficersByTerm(
  curr_term: string
): Promise<Officers[]> {
  return await client.fetch(
    groq`*[_type == "officer" && current_term == "${curr_term}"] | order(position.hierarchy asc)`
  );
}

export interface Officer {
  _id: string;
  _type: "officer";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}
export interface Officers {
  year_level: string;
  _rev: string;
  program: string;
  _type: "officer";
  last_name: string;
  _id: string;
  position: {
    title: string;
    hierarchy: string;
  };
  first_name: string;
  image: ImageAsset;
  current_term: string;
  _createdAt: string;
}

export interface Post {
  _id: string;
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}
