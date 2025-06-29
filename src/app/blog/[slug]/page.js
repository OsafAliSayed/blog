import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { supabase, BUCKET_NAME } from '@/lib/supabase';

// helper function to highlight search terms in text
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

// helper function to highlight search terms in HTML content
function highlightInHTML(html, searchTerm) {
  if (!searchTerm.trim()) return html;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return html.replace(regex, '<mark class="bg-primary/20 text-primary p-1 rounded">$1</mark>');
}

export async function generateStaticParams() {
    try {
        const { data: files, error } = await supabase.storage
            .from(BUCKET_NAME)
            .list('', {
                limit: 100,
                search: '.md'
            });

        if (error) {
            console.error('Error fetching files from Supabase:', error);
            return [];
        }

        return files
            .filter(file => file.name.endsWith('.md'))
            .map((file) => ({
                slug: file.name.replace(/\.md$/, ''),
            }));
    } catch (error) {
        console.error('Error in generateStaticParams:', error);
        return [];
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    
    try {
        // Download the markdown file from Supabase storage
        const { data: fileData, error } = await supabase.storage
            .from(BUCKET_NAME)
            .download(`${slug}.md`);

        if (error) {
            console.error('Error downloading file from Supabase:', error);
            throw new Error('Post not found');
        }

        // Convert the blob to text
        const fileContents = await fileData.text();
        const { data, content } = matter(fileContents);
        
        const processedContent = await remark()
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeHighlight)
            .use(rehypeStringify)
            .process(content);
        const contentHtml = processedContent.toString();

        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <Button variant="ghost" asChild className="mb-6">
                            <Link href="/">← Back to Blog</Link>
                        </Button>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{data.title}</h1>
                            {data.date && (
                                <p className="text-lg text-muted-foreground">
                                    {new Date(data.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )}
                        </div>
                    </div>


                    <article
                        className="dark prose"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />

                    <div className="mt-12 pt-8 border-t">
                        <div className="flex justify-between items-center">
                            <Button variant="outline" asChild>
                                <Link href="/">← More Posts</Link>
                            </Button>
                            <div className="text-sm text-muted-foreground">
                                <a
                                    href="https://osafalisayed.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Visit Portfolio →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading blog post:', error);
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
                    <p className="text-muted-foreground mb-6">
                        The blog post you are looking for does not exist
                    </p>
                    <Button asChild>
                        <Link href="/">← Back to Blog</Link>
                    </Button>
                </div>
            </div>
        );
    }
}