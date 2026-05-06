import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob, file } from 'astro/loaders'

const cv = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cv' }),
  schema: z.object({
    lang: z.enum(['de', 'en']),
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    start: z.string(),
    end: z.string().optional(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    order: z.number(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    lang: z.enum(['de', 'en']),
    title: z.string(),
    industry: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    start: z.number(),
    end: z.number().optional(),
    order: z.number(),
  }),
})

const skills = defineCollection({
  loader: file('src/content/skills.json'),
  schema: z.object({
    id: z.string(),
    categories: z.array(
      z.object({
        key: z.string(),
        label: z.object({
          de: z.string(),
          en: z.string(),
        }),
        items: z.array(z.string()),
      }),
    ),
  }),
})

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    lang: z.enum(['de', 'en']),
    title: z.string(),
  }),
})

export const collections = { cv, projects, skills, legal }
