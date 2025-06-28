import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Osaf's Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights on web development
          </p>
          
          {/* Search Field */}
          <div className="mt-8">
            <SearchField 
              onSearch={handleSearch}
              placeholder="Search posts by title, content, or tags..."
            />
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.slug} className="card-glossy">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl">
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                        {post.date && (
                          <p className="text-sm text-muted-foreground">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline">
                      <Link href={`/blog/${post.slug}`}>
                        Read More →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredPosts.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {posts.length === 0 ? "No blog posts found." : "No posts match your search."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
