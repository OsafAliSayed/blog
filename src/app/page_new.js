import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SearchablePostList } from '@/components/searchable-post-list';

const postsDirectory = path.join(process.cwd(), 'posts');

export default async function HomePage() {
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Osaf's Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights on web development
          </p>
        </div>
        
        <SearchablePostList posts={posts} />
      </div>
    </div>
  );
}
