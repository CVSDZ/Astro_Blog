import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().max(200),
    week: z.number().int().min(1).max(19),
    lab: z.string().optional(), // 关联 llm-lab 下的目录名
    milestone: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const lab = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lab' }),
  schema: z.object({
    week: z.number().int().min(1).max(19),
    title: z.string(),
    done: z.boolean().default(false),
    repoDir: z.string(), // llm-lab 下的相对路径
    metrics: z.record(z.string(), z.string()).default({}),
    pitfalls: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, lab };