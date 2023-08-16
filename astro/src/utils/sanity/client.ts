import { createClient } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
// import { blocksToText } from "@sanity/block-content-to-react";
import groq from "groq";

const token =
  import.meta.env?.PUBLIC_SANITY_READ_TOKEN ||
  process.env.PUBLIC_SANITY_READ_TOKEN;

if (
  !import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  !import.meta.env.PUBLIC_SANITY_DATASET
) {
  throw new Error("Did you forget to run sanity init --env?");
}

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  token: token,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-03-20", // date of setup
});

export async function getSiteSettings(): Promise<SiteSettingsProp> {
  return await client
    .fetch(groq`*[_type == "siteSettings" && _id == "siteSettings"][0]`)
    .catch(console.error);
}

export async function getTerm(): Promise<{ current_term: string }> {
  return await client
    .fetch(groq`*[_type == "siteSettings"][0] {current_term}`)
    .catch(console.error);
}

export async function getPosts(
  from?: number,
  to?: number
): Promise<PostProp[]> {
  return await client
    .fetch(
      groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]${
        from ? '["'.concat(from.toString(), "...", to!.toString(), '"]') : []
      } {
        id,
        _type,
        _createdAt,
        title,
        slug,
        mainImage,
        categories[]->{_id,title}
      } | order(_createdAt desc)`
    )
    .catch(console.error);
}

// modified to fetch image url
export async function getPost(slug: string): Promise<PostProp> {
  return await client
    .fetch(
      groq`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        title,
        author->{_id, name, slug, image, bio},
        slug,
        "mainImage": mainImage.asset->url,
        body,
        categories[]->{_id,title} 
      }
    `,
      {
        slug,
      }
    )
    .catch(console.error);
}

export async function getOfficers(): Promise<OfficerProp[]> {
  return await client
    .fetch(groq`*[_type == "officer"] | order(position.hierarchy asc)`)
    .catch(console.error);
}

export async function getOfficersByTerm(
  curr_term: string
): Promise<OfficerProp[]> {
  return await client
    .fetch(
      groq`*[_type == "officer" && current_term == "${curr_term}"] | order(position.hierarchy asc)`
    )
    .catch(console.error);
}

export async function getAdviserByTerm(
  curr_term: string
): Promise<AdviserProp> {
  return await client
    .fetch(groq`*[_type == "adviser" && current_term == "${curr_term}"][0]`)
    .catch(console.error);
}

export async function getCommitteeHeadByTerm(
  curr_term: string
): Promise<CommitteeProp[]> {
  return await client
    .fetch(
      groq`*[_type == "committee" && current_term == "${curr_term}" && position.title match "Head"]`
    )
    .catch(console.error);
}

export async function getCommitteeByTerm(
  curr_term: string
): Promise<CommitteeProp[]> {
  return await client
    .fetch(
      groq`*[_type == "committee" && current_term == "${curr_term}" && !(position.title match "Head")]`
    )
    .catch(console.error);
}

export interface SiteSettingsProp {
  _createdAt: string;
  _id: string;
  _type: "siteSettings";
  description: string;
  ogImage: ImageAsset;
  title: string;
  url: string;
  current_term: string;
}

export interface OfficerProp {
  _id: string;
  _type: "officer";
  _createdAt: string;
  first_name: string;
  last_name: string;
  image?: ImageAsset;
  year_level: string;
  program: string;
  position: {
    title: string;
    hierarchy: number;
  };
  current_term: string;
}
export interface CommitteeProp {
  _id: string;
  _type: "committee";
  _createdAt: string;
  first_name: string;
  last_name: string;
  image?: ImageAsset;
  year_level: string;
  program: string;
  position: {
    title: string;
  };
  current_term: string;
}

export interface AdviserProp {
  _id: string;
  _type: "adviser";
  _createdAt: string;
  first_name: string;
  last_name: string;
  image?: ImageAsset;
  position: { title: string };
  current_term: string;
}

export interface PostProp {
  _id: string;
  _type: "post";
  _createdAt: string;
  title?: string;
  author: Author;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
  categories: { _id: string; title: string }[];
}

export interface Author {
  _id: string;
  _type: "author";
  _createdAt: string;
  name: string;
  slug: Slug;
  image: ImageAsset;
  bio: PortableTextBlock[];
}
