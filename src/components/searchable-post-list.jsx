"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/components/search-provider';

// Helper function to highlight search terms
function highlightText(text, searchTerm) {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return (
        <mark key={index} className="bg-primary/20 text-primary p-1 rounded">
          {part}
        </mark>
      );
    }
    return part;
  });
}

export function SearchablePostList({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const { searchTerm } = useSearch();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return (
    <div id="posts-section">
      {/* Posts Header */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
        <p className="text-lg text-muted-foreground">
          Explore articles on web development, programming, and technology
        </p>
      </div>

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
                      {highlightText(post.title, searchTerm)}
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
                          {highlightText(tag, searchTerm)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <CardDescription className="text-base leading-relaxed">
                {highlightText(post.excerpt, searchTerm)}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {posts.length === 0 ? "No blog posts found." : "No posts match your search."}
          </p>
        </div>
      )}
    </div>
  );
}
