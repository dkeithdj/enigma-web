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
    groq`*[_type == "post" && defined(slug.current)]{
        _id,
        _type,
        _createdAt,
        title,
        author->{_id, name, slug, "image": image.asset->url, bio},
        slug,
        "mainImage": mainImage.asset->url,
        body 
    } | order(_createdAt desc)`
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
        author->{_id, name, slug, "image": image.asset->url, bio},
        slug,
        "mainImage": mainImage.asset->url,
        body 
      }
    `,
    {
      slug,
    }
  );
}

export async function getOfficers(): Promise<Officer[]> {
  return await client.fetch(
    groq`*[_type == "officer"]{
      _id,
      _type,
      current_term,
      first_name,
      last_name,
      "image": image.asset->url,
      position,
      program,
      year_level
    } | order(position.hierarchy asc)`
  );
}

export async function getOfficersByTerm(curr_term: string): Promise<Officer[]> {
  return await client.fetch(
    groq`*[_type == "officer" && current_term == "${curr_term}"]{
      _id,
      _type,
      current_term,
      first_name,
      last_name,
      "image": image.asset->url,
      position,
      program,
      year_level
    } | order(position.hierarchy asc)`
  );
}

export async function getAdviserByTerm(curr_term: string): Promise<Adviser> {
  return await client.fetch(
    groq`*[_type == "adviser" && current_term == "${curr_term}"][0] {
      _id,
      _type,
      current_term,
      first_name,
      last_name,
      "image": image.asset->url,
      position,
      program,
      year_level
    }`
  );
}

export async function getCommitteeByTerm(
  curr_term: string
): Promise<Officer[]> {
  return await client.fetch(
    groq`*[_type == "committee" && current_term == "${curr_term}" && position.title match "Head"]{
      _id,
      _type,
      current_term,
      first_name,
      last_name,
      "image": image.asset->url,
      position,
      program,
      year_level
    }`
  );
}

export interface Officer {
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
export interface Committee {
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

export interface Adviser {
  _id: string;
  _type: "adviser";
  _createdAt: string;
  first_name: string;
  last_name: string;
  image?: ImageAsset;
  position: { title: string };
  current_term: string;
}

export interface Post {
  _id: string;
  _type: "post";
  _createdAt: string;
  title?: string;
  author: Author;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
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
