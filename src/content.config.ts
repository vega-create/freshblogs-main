import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import fs from 'node:fs';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  faq: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })).optional(),
});

const sites = ['astrology','tarot','numerology','dreams','personality','manifest','quotes','pets','recipes','ai','travel','diy','garden'];

const collections: Record<string, ReturnType<typeof defineCollection>> = {};
sites.forEach(site => {
  const base = `./src/content/${site}/blog`;
  // Ensure directory exists to prevent glob errors
  if (!fs.existsSync(base)) {
    fs.mkdirSync(base, { recursive: true });
  }
  collections[`${site}-blog`] = defineCollection({
    loader: glob({ pattern: '**/*.md', base }),
    schema: blogSchema,
  });
});

export { collections };
