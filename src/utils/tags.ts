import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** URL-safe slug for a tag (shared by routing and link generation). */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Canonical path to a tag's archive page. */
export function tagPath(tag: string): string {
  return `/blog/tags/${tagSlug(tag)}/`;
}

/** All published (non-draft) posts, newest first. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
}

export type TagEntry = { slug: string; tag: string; posts: BlogPost[] };

/**
 * Map of tag slug -> { display label, posts } across all published posts.
 * The first-seen spelling of a tag wins as the display label.
 */
export async function getTags(): Promise<Map<string, TagEntry>> {
  const posts = await getPublishedPosts();
  const map = new Map<string, TagEntry>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      if (!map.has(slug)) map.set(slug, { slug, tag, posts: [] });
      map.get(slug)!.posts.push(post);
    }
  }
  return map;
}
