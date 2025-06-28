import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SearchProvider } from '@/components/search-provider';
import { HeroSection } from '@/components/hero-section';
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
    <SearchProvider>
      <div className="min-h-screen">
        {/* <HeroSection /> */}
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <SearchablePostList posts={posts} />
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}
