# Supabase Storage Setup Instructions

## Setting up your Supabase Storage for Blog Posts

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Create a storage bucket**:
   - Go to Storage in your Supabase dashboard
   - Create a new bucket named `blog-posts` (or any name you prefer)
   - Make sure the bucket is set to **public** for read access

3. **Upload your markdown files**:
   - Upload your `.md` blog post files directly to the root of the bucket
   - Each file should have proper frontmatter, for example:
   ```markdown
   ---
   title: "Your Blog Post Title"
   date: "2024-01-01"
   tags:
    - "#test"
    - "#checkthisout"
   ---
   
   Your blog post content here...
   ```

4. **Configure environment variables**:
   - Copy `.env.local` and update with your actual Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_BUCKET_NAME=blog-posts
   ```

5. **Get your Supabase credentials**:
   - Go to Settings → API in your Supabase dashboard
   - Copy the Project URL and anon public key

## File Structure in Supabase

Your bucket should look like:
```
blog-posts/
├── first-post.md
├── second-post.md
└── another-post.md
```

## Note

Make sure your bucket is public for read access, as this is a static blog that needs to fetch posts on the client side. The bucket policies should allow public read access to all files.
