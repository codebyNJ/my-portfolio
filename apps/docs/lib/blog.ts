import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  headerImage: string;
  readTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  headerImage: string;
  readTime: string;
}

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostMeta(slug))
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  return posts;
}

export function getPostMeta(slug: string): BlogPostMeta {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category || '',
    excerpt: data.excerpt || '',
    headerImage: data.headerImage || '/images/default-header.jpg',
    readTime: data.readTime || '5 min read',
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category || '',
    excerpt: data.excerpt || '',
    headerImage: data.headerImage || '/images/default-header.jpg',
    readTime: data.readTime || '5 min read',
    content: contentHtml,
  };
}
