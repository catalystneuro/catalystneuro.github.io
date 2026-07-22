import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    image: z.string().optional(),
    // Photos fill the 16/9 frame ("cover", the default). Wide banner graphics
    // lose their edges when cropped, so they use "contain" and letterbox.
    imageFit: z.enum(["cover", "contain"]).optional(),
    readTime: z.string().optional(),
    author: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

const conversions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/nwb-conversions" }),
  schema: z.object({
    lab: z.string(),
    institution: z.string(),
    description: z.string(),
    species: z.union([z.string(), z.array(z.string())]).optional(),
    // The month the engagement STARTED, not when it finished. Conversion
    // projects typically run about a year, so do not label this as a
    // completion date.
    date: z.union([z.string(), z.date()]).transform((v) => (v instanceof Date ? v.toISOString().slice(0, 7) : v)).optional(),
    tags: z.array(z.string()).optional(),
    github: z.union([z.string(), z.array(z.string())]).optional(),
    dandi: z
      .union([
        z.string(),
        z.array(z.object({ url: z.string(), name: z.string().optional() })),
      ])
      .optional(),
    funded_project: z.string().optional(),
  }),
});

const software = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/software" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    status: z.string().optional(),
    type: z.enum(["core", "extension", "analysis", "guide"]),
    image: z.string().optional(),
    github: z.string().optional(),
    docs: z.string().optional(),
  }),
});

// YAML parses unquoted dates into JS Date objects; coerce back to a string.
const dateish = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v));

const fundedProjects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/funded-projects" }),
  schema: z.object({
    title: z.string(),
    funder: z.string(),
    status: z.string(),
    startDate: dateish,
    description: z.string().optional().default(""),
    image: z.string().optional(),
    github: z.array(z.string()).optional(),
  }),
});

const openings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/openings" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    type: z.string(),
    location: z.string(),
    enabled: z.boolean().optional(),
    description: z.string(),
    image: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, conversions, software, fundedProjects, openings };
