import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function generateStaticParams() {
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map((filename) => ({
        slug: filename.replace(/\.md$/, ''),
    }));
}

export default async function BlogPostPage({ params }) {
    const { slug } = params;
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(gfm).use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-6">
                        <Link href="/blog">← Back to Blog</Link>
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
                    className="prose prose-lg max-w-none dark:prose-invert 
                       prose-headings:scroll-m-20 prose-headings:tracking-tight prose-headings:font-bold
                       prose-h1:text-5xl prose-h1:mb-8 prose-h1:mt-10 prose-h1:leading-tight prose-h1:font-extrabold
                       prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:leading-tight prose-h2:border-b prose-h2:pb-3 prose-h2:font-bold
                       prose-h3:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:leading-tight prose-h3:font-semibold
                       prose-h4:text-2xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:leading-tight prose-h4:font-semibold
                       prose-h5:text-xl prose-h5:mb-2 prose-h5:mt-4 prose-h5:leading-tight prose-h5:font-medium
                       prose-h6:text-lg prose-h6:mb-2 prose-h6:mt-4 prose-h6:leading-tight prose-h6:font-medium
                       prose-p:leading-7 prose-p:mb-4 prose-p:text-base
                       prose-ul:my-4 prose-ul:space-y-2 prose-li:my-1
                       prose-ol:my-4 prose-ol:space-y-2
                       prose-strong:font-semibold prose-strong:text-foreground
                       prose-em:italic prose-em:text-muted-foreground
                       prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                       prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                       prose-code:bg-muted prose-code:text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:font-semibold prose-code:border prose-code:border-border
                       prose-pre:bg-muted prose-pre:text-foreground prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:border prose-pre:border-border prose-pre:shadow-sm
                       prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                       prose-hr:my-8 prose-hr:border-border
                       prose-table:my-6 prose-th:font-semibold prose-th:text-left prose-th:border-b prose-th:border-border prose-th:pb-2
                       prose-td:border-b prose-td:border-border prose-td:py-2"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                <div className="mt-12 pt-8 border-t">
                    <div className="flex justify-between items-center">
                        <Button variant="outline" asChild>
                            <Link href="/blog">← More Posts</Link>
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
}
