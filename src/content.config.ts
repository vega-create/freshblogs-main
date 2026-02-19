import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

const astrologyBlog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/astrology/blog' }),
  schema: blogSchema,
});

export const collections = {
  'astrology-blog': astrologyBlog,
};
