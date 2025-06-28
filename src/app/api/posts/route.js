import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function GET() {
  try {
    const filenames = fs.readdirSync(postsDirectory);
    const posts = filenames.map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Get excerpt from content (first 150 characters)
      const excerpt = content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 150) + '...';
      
      // Parse tags from frontmatter
      const tags = data.tag ? data.tag.split(',').map(tag => tag.trim()) : [];
      
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || filename,
        date: data.date || '',
        tags,
        excerpt,
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 });
  }
}
