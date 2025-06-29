import matter from 'gray-matter';
import { SearchablePostList } from '@/components/searchable-post-list';
import { supabase, BUCKET_NAME} from '@/lib/supabase';

export default async function HomePage() {
  let posts = [];
  
  try {
    // Get list of markdown files from Supabase storage
    const { data: files, error: listError } = await supabase
      .storage
      .from('blog-posts')
      .list('', {
        limit: 100,
      });
    
    if (listError) {
      console.error('Error listing files from Supabase:', listError);
    } else {
      // Filter markdown files and process them
      const markdownFiles = files.filter(file => file.name.endsWith('.md'));
      console.log('Markdown files:', markdownFiles);
      const postsData = await Promise.all(markdownFiles.map(async (file) => {
        try {
          // Download each file content
          const { data: fileData, error: downloadError } = await supabase.storage
            .from(BUCKET_NAME)
            .download(file.name);

          if (downloadError) {
            console.error(`Error downloading ${file.name}:`, downloadError);
            return null;
          }

          const fileContents = await fileData.text();
          const { data, content } = matter(fileContents);
          
          // Get excerpt from content (first 150 characters)
          const excerpt = content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 150) + '...';
          
          // Parse tags from frontmatter
          const tags = Array.isArray(data.tags) ? data.tags : (data.tag ? data.tag.split(',').map(tag => tag.trim()) : []);
          console.log('Tags:', tags);
          return {
            slug: file.name.replace(/\.md$/, ''),
            title: data.title || file.name,
            date: data.date || '',
            tags,
            excerpt,
          };
        } catch (error) {
          console.error(`Error processing ${file.name}:`, error);
          return null;
        }
      }));

      // Filter out failed downloads and sort by date
      posts = postsData.filter(post => post !== null)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  } catch (error) {
    console.error('Error reading posts:', error);
  }

  return (
    <div className="min-h-screen">
      {/* <HeroSection /> */}
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <SearchablePostList posts={posts} />
        </div>
      </div>
    </div>
  );
}
