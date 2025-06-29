import { supabase, BUCKET_NAME } from './supabase';

/**
 * Fetch all blog posts from Supabase storage
 * @returns {Promise<Array>} Array of blog post objects
 */
export async function fetchAllPosts() {
  try {
    // Get list of markdown files from Supabase storage
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        limit: 100,
        search: '.md'
      });

    if (listError) {
      console.error('Error listing files from Supabase:', listError);
      return [];
    }

    // Filter markdown files and process them
    const markdownFiles = files.filter(file => file.name.endsWith('.md'));
    
    const posts = await Promise.all(markdownFiles.map(async (file) => {
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
        const matter = await import('gray-matter');
        const { data, content } = matter.default(fileContents);
        
        // Get excerpt from content (first 150 characters)
        const excerpt = content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 150) + '...';
        
        // Parse tags from frontmatter
        const tags = Array.isArray(data.tags) ? data.tags : (data.tag ? data.tag.split(',').map(tag => tag.trim()) : []);
        
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
    return posts.filter(post => post !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug from Supabase storage
 * @param {string} slug - The slug of the blog post
 * @returns {Promise<Object|null>} Blog post object or null if not found
 */
export async function fetchPostBySlug(slug) {
  try {
    // Download the markdown file from Supabase storage
    const { data: fileData, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(`${slug}.md`);

    if (error) {
      console.error('Error downloading file from Supabase:', error);
      return null;
    }

    // Convert the blob to text
    const fileContents = await fileData.text();
    const matter = await import('gray-matter');
    const { data, content } = matter.default(fileContents);
    
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : (data.tag ? data.tag.split(',').map(tag => tag.trim()) : []),
      content,
      data
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}
